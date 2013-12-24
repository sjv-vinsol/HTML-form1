$(document).ready(function() {
  createProducts();
  selectItemOnClick();
  addEventOnPlaceOrder();
})

var main = {
  totalOrderPrice: 0,
  idCount: 0,
  validNameRegex: /^[a-z ]*$/i,
  orderId: 0,
  totalSale: 0,
  productsCollection: {},
  productInOrderSummary: {}
}

var menuJSON = {
    'bread': {'wheat': 10, 'brown': 20, 'multigrain': 25}, 
    'sauce': {'tomato': 5, 'mustard': 15, 'mix': 10}, 
    'filling': {'veg': 30, 'chicken': 50, 'pork': 40}
  }

function Product (name, price, type){
  this.id = ++main.idCount;
  this.name = name;
  this.price = price;
  this.type = type;
}

function displayProduct(product, elem) {
  var productDisplayText = product.name + " (" + product.price + ") ";
  var option = $('<p/>', {text: productDisplayText, product_id: product.id});
  main.productsCollection[product.id] = product;
  elem.append(option);
}

function displayHeader(elem, header) {
  elem.append($('<p/>', {class: 'header', text: header.toUpperCase()}));
}

function createProducts() {
  $.each(menuJSON, function(header,values){
    var elem = $('<div/>', {id: header, class: 'optionsDiv'});
    displayHeader(elem, header);
    $.each(values, function(name, price) {
      var product = new Product(name, price, header);
      displayProduct(product, elem);
    })
    $('#menu_container').append(elem);
  })
}

function selectItemOnClick() {
  $('#menu_container').find("p:not('.header')").bind("click", function () {
    var option = $(this);
    var product = main.productsCollection[option.attr("product_id")];
    option.closest('.optionsDiv').find("p").not($(this)).removeClass('selected');
    option.toggleClass("selected");
    updateOrderSummary(product);
  })
}

function presentInOrderList(id) {
  if ($("#" + id).length) {
    return true
  } else {
    return false;
  }
}

function productIsSame(product) {
  if (main.productInOrderSummary[product.type].id == product.id) {
    return true
  } else {
    return false;
  }
}

function removeProduct(type) {
  var product = main.productInOrderSummary[type]
  $('#order_summary').find("[product_id="+product.id+"]").remove();
  main.totalOrderPrice -= product.price;
  delete main.productInOrderSummary[type];
}

function addNewProduct(product) {
  var item = $('<p/>', {text: "-->   " + product.type + " : " + product.name + "  =  " + product.price, product_id: product.id});
  $('#order_summary').append(item);
  main.productInOrderSummary[product.type] = product;
  main.totalOrderPrice += product.price;
}

function updateOrderPrice() {
  $('#order_total').text("Order Total :" + main.totalOrderPrice);
}

function productOfSameTypeIsPresent(product) {
  if ($.inArray(product.type, Object.keys(main.productInOrderSummary)) >= 0) {
    return true;
  } else {
    return false;
  }
}

function updateOrderSummary(product) {
  if (productOfSameTypeIsPresent(product)) {
    if (productIsSame(product)) {
      removeProduct(product.type);
    } else {
      removeProduct(product.type);
      addNewProduct(product);
    }
  } else {
    addNewProduct(product);
  }
  updateOrderPrice();
}

function makeOrdersSectionVisible() {
  $("#finalOrders").removeClass("hidden");
}

function addEventOnPlaceOrder() {
  $("#placeOrder").bind("click", function () {
    var customerName = prompt("Please enter you name!!").trim();
    if (main.validNameRegex.test(customerName) && customerName && main.totalOrderPrice) {
      makeOrdersSectionVisible();
      createOrder(customerName);
    }
  })
}

function Order(customerName) {
  this.id = ++main.orderId;
  this.customerName = customerName;
  this.products = [];
  this.totalPrice = 0;
}

function appendproductsToOrderContainer(order, orderElem, product) {
  order.products.push(product);
  var text = "-->  " + product.type + "  :  " + product.name + "  =  " + product.price;
  orderElem.append($('<p/>', {text: text}));
}

function displayCustomerNameIdAndPrice(order, orderElem) {
  orderElem.prepend($('<p/>', {text: "Order Id : #" + order.id + ",  " + "Customer Name : "+ order.customerName}))
  orderElem.append($('<p/>', {text: "Total Price :  " + order.totalPrice}));
}

function resetDefaultValues() {
  main.totalOrderPrice = 0;
  $('#order_summary').html("");
  $('#order_total').html("Order Total : " + main.totalOrderPrice);
  main.productInOrderSummary = {};
  $("#menu_container p").removeClass("selected");
}

function updateTotalSale() {
  $("#total_sale").text("Total Sale : " + main.totalSale);
}

function appendOrderToContainer(orderElem, orderContainer) {
  orderContainer.append(orderElem);
  resetDefaultValues();
  updateTotalSale();
}

function createOrder(customerName) {
  var orderContainer = $('#finalOrders'), price = 0;
  var orderElem = $("<div/>", {class: "orderElem", id: main.orderId});
  var order = new Order(customerName);
  order.totalPrice = main.totalOrderPrice;
  main.totalSale +=  order.totalPrice;
  $.each(main.productInOrderSummary, function (type, product){
    appendproductsToOrderContainer(order, orderElem, product);
  })
  displayCustomerNameIdAndPrice(order, orderElem);
  appendOrderToContainer(orderElem, orderContainer);
}