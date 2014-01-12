$(document).ready(function() {
  init();
})

var main = {
  idCount: 0,
  validNameRegex: /^[a-z]+( [a-z]*)*$/i,
  orderId: 0,
  totalSale: 0,
  itemsCollection: {}
}

var menuJSON = {
    'bread': {'wheat': 10, 'brown': 20, 'multigrain': 25},
    'sauce': {'tomato': 5, 'mustard': 15, 'mix': 10, 'chilli': 100},
    'filling': {'veg': 30, 'chicken': 50, 'pork': 40},
  }

function Item (name, price, type){
  this.id = ++main.idCount;
  this.name = name;
  this.price = price;
  this.type = type;
}

function init() {
  createItems();
  order = new Order();
  order.init();
}

function displayItem(item, elem) {
  var text = item.name + " (" + item.price + ") ";
  var option = $('<p/>', {text: text, product_id: item.id, class: "item "+item.type+""});
  main.itemsCollection[item.id] = item;
  elem.append(option);
}

function displayHeader(elem, header) {
  elem.append($('<p/>', {class: 'header', text: header.toUpperCase()}));
}

function createItems() {
  $.each(menuJSON, function(header,values){
    var elem = $('<div/>', {id: header, class: 'optionsDiv'});
    displayHeader(elem, header);
    $.each(values, function(name, price) {
      var item = new Item(name, price, header);
      displayItem(item, elem);
    })
    $('#menu_container').append(elem);
  })
}

function Order() {
  this.id = ++main.orderId;
  this.customerName = "";
  this.orderTotal = 0;
  this.types = [];
  this.items = {};
  this.itemCount = 0;

  this.selectElement = function (item, itemElem) {
    $('.' + item.type).not(itemElem).removeClass("selected");
    itemElem.toggleClass("selected");
  }  

  this.resetOrderTotal = function () {
    $("#order_total").text(0);
  }

  this.deselectItems = function () {
    $(".selected").removeClass("selected");
  }

  this.unbindPlaceOrderEvent = function () {
    $("#placeOrder").unbind("click");
  }

  this.addItemHandler = function (itemElem) {
    var item = main.itemsCollection[itemElem.attr('product_id')];
    this.selectElement(item, itemElem);
    // check if item of same type is already present in cart
    if (this.checkForValueInArray(this.types, item.type)) {
      // check if the same item is present in cart
      if (this.checkForValueInArray(Object.keys(this.items), item.id)) {
        this.removeItem(item)
      } else {
        this.changeItem(item);
      }
    } else {
      this.addItemToOrder(item);
    }
    this.updateOrderSummary();
  }

  this.unbindAddItemHandler = function () {
    $('.item').unbind('click');
  }

  this.init = function () {
    var order = this;
    this.showNoItemText();
    this.unbindAddItemHandler();
    this.unbindPlaceOrderEvent();
    this.clearOrderSummary($("#order_summary"));
    this.resetOrderTotal();
    this.deselectItems();
    this.placeOrderOnClick();
    $('.item').bind('click', function () {
      var itemElem = $(this);
      order.addItemHandler(itemElem);
    })
  }

  this.checkForValueInArray = function (array, value) {
    var returnValue = false;
    $.each(array, function(index, val) {
      if (val == value) {
        returnValue = true;
      }
    })
    return returnValue;
  }

  this.getItemFromCart = function (type) {
    var returnValue = "";
    $.each(this.items, function (key, val) {
      if (val.type == type) {
        returnValue = val;
        // break;
      }
    })
    return returnValue;
  }

  this.updateOrderTotal = function () {
    var order = this;
    this.orderTotal = 0;
    $.each(this.items, function(index, val) {
      order.orderTotal += val.price;
    })
    this.displayOrderTotal();
  }

  this.displayOrderTotal = function () {
    $("#order_total").text(this.orderTotal);
  }

  this.changeItem = function(item) {
    var itemToBeChanged = this.getItemFromCart(item.type);
    this.removeItem(itemToBeChanged);
    this.addItemToOrder(item);
  }

  this.addItemToOrder = function (item) {
    this.types.push(item.type);
    this.items[item.id] = item;
    this.updateOrderTotal();
    this.hideNoItemText()
  }

  this.hideNoItemText = function () {
    $("#noItemText").addClass('noDisplay');
  }

  this.removeItem = function (item) {
    delete this.items[item.id];
    this.updateOrderTotal();
    this.updateOrderSummary();
    this.removeItemTypeFromOrder(item.type);
    this.showNoItemText()
  }

  this.showNoItemText = function () {
    if (!this.types.length) {
      $("#noItemText").removeClass('noDisplay');
    }
  }

  this.removeItemTypeFromOrder = function (type) {
    var index = this.types.indexOf(type);
    this.types.splice(index, 1);
  }

  this.clearOrderSummary = function (orderSummary) {
    orderSummary.html("");
    this.itemCount = 0;
  }

  this.placeOrderOnClick = function () {
    $("#placeOrder").bind("click", function() {
      if (this.types.length) {
        var name = prompt("Enter Your Name.");
        if (main.validNameRegex.test(name.trim())) {
          this.customerName = name;
          addToOrderList(this);
        }
      } else {
        alert("Cart can\'t be blank");
      }
    }.bind(this))
  }

  this.updateOrderSummary = function () {
    var order = this;
    if (this.types.length) {
      var orderSummary = $("#order_summary");
      order.clearOrderSummary(orderSummary);
      $.each(this.items, function (index, val) {
        var text = ++order.itemCount + ")  " + val.type.toUpperCase() + " : " + val.name + " = " + val.price;
        var elem = $('<p/>', {text: text});
        orderSummary.append(elem);
      })
    }
  }
}

function displayNameAndId(order, orderElem) {
  var idElem = $("<span/>", {text: "Order #" + order.id, class: "order_id"});
  var nameElem = $("<span/>", {text: "By : " + order.customerName});
  var elem = $('<p/>', {text: "Item List :"});
  orderElem.append(idElem, nameElem, elem);
}

function displayOrderItems(orderElem) {
  var orderItems = $("#order_summary").clone();
  orderElem.append(orderItems);
}

function diplayOrderTotal(orderElem, order) {
  var orderTotalElem = $("<p/>", {text: "Order Total : " + order.orderTotal});
  orderElem.append(orderTotalElem);
}

function createNewOrder() {
  var order = new Order();
  order.init();
}

function updateTotalSale(order) {
  main.totalSale += order.orderTotal;
  $("#total_sale").text(main.totalSale);
}

function addToOrderList(order) {
  updateTotalSale(order);
  var orderElem = $("<div/>", {class: "orderElem", id: order.id});
  displayNameAndId(order, orderElem);
  displayOrderItems(orderElem);
  diplayOrderTotal(orderElem, order);
  $('#finalOrders').removeClass("hidden").append(orderElem);
  createNewOrder();
}