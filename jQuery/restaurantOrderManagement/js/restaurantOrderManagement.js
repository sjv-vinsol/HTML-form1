$(document).ready(function() {
  kioski = new Kioski();
  kioski.init();
})

var menuJSON = {
  'bread': {'wheat': 10, 'brown': 20, 'multigrain': 25},
  'sauce': {'tomato': 5, 'mustard': 15, 'mix': 10, 'chilli': 100},
  'filling': {'veg': 30, 'chicken': 50, 'pork': 40}
}

function Item (name, price, type){
  this.id = ++kioski.itemIdCounter;
  this.name = name;
  this.price = price;
  this.type = type;
}

function Order() {
  this.customerName = "";
  this.orderTotal = 0;
  this.items = {};
}

function Kioski() {
  this.orders = [];
  this.current_order = {};
  this.validNameRegex = /^[a-z]+( [a-z]*)*$/i;
  this.itemIdCounter = 0;
  this.itemsCollection = {};
  this.totalSale = 0;

  this.init = function () {
    this.current_order = new Order();
    this.createItems();
    $("#placeOrder").bind('click', function () {
      this.placeOrderHandler();
    }.bind(this))
    $('.item').bind('click', function () {
      kioski.addToCartHandler($(this));
    })
  }

  this.createItems = function () {
    $.each(menuJSON, function(header,values){
      var elem = $('<div/>', {id: header, class: 'optionsDiv'});
      displayHeader(elem, header);
      $.each(values, function(name, price) {
        var item = new Item(name, price, header);
        kioski.displayItem(item, elem);
      })
      $('#menu_container').append(elem);
    })
  }

  this.displayItem = function (item, elem) {
    var text = item.name + " (" + item.price + ") ";
    var itemElem = $('<p/>', {text: text, id: item.id , class: "item "+item.type+""});
    // itemElem.data('item_id', item.id);
    this.itemsCollection[item.id] = item;
    elem.append(itemElem);
  }

  function displayHeader(elem, header) {
    elem.append($('<p/>', {class: 'header', text: header.toUpperCase()}));
  }

  this.placeOrderHandler = function () {
    if (this.cartIsNotEmpty()) {
      var name = prompt("Enter your name!!");
      if (this.validName(name)) {
        this.current_order.customerName = name;
        this.orders.push(this.current_order);
        this.displayFinalOrder();
        this.updateTotalSale();
        this.current_order = new Order();
        this.resetKioski();
      }
    }else {
      alert("Cart can't be blank");
    }
  }

  this.cartIsNotEmpty = function () {
    return Object.keys(this.current_order.items).length;
  }

  this.validName = function (name) {
    return this.validNameRegex.test(name.trim());
  }

  this.addToCartHandler = function (itemElem) {
    console.log(itemElem);
    var item = this.itemsCollection[itemElem.attr("id")];
    // console.log
    if (this.isItemAlreadyPresentInOrder(itemElem)) {
      this.removeItemFromCurrentOrder(item);
    } else if (this.itemOfSameTypePresentInCart(item.type)) {
      this.removeItemFromCurrentOrder(this.getItemToBeRemoved(item));
      this.addItemToCurrentOrder(item);
    } else {
      this.addItemToCurrentOrder(item);
    }
    this.emptyCartMessage();
  }

  this.displayFinalOrder = function () {
    var containerElem = $("#order_container_template").clone().removeClass("noDisplay").attr("id", "");
    containerElem.find(".order_id").text("Order #" + this.orders.length);
    containerElem.find(".c_name").text("Customer Name :  " + this.current_order.customerName);
    containerElem.find(".order_total").text("Order Total :" + this.current_order.orderTotal);
    this.appendItems(containerElem.find(".order_items"));
    $("#finalOrders").removeClass("hidden").append(containerElem);
  }

  this.updateTotalSale = function () {
    this.totalSale += this.current_order.orderTotal;
    $("#total_sale").text(this.totalSale);
  }

  this.resetKioski = function () {
    this.unhighlightAllItems();
    this.updateCart();
  }  

  this.addItemToCurrentOrder = function (item) {
    this.current_order.items[item.id] = item;
    this.highlightItem(item);
    this.current_order.orderTotal += item.price;
    this.updateCart();
  }

  this.removeItemFromCurrentOrder = function (item) {
    delete this.current_order.items[item.id];
    this.unHighlightItem(item);
    this.current_order.orderTotal -= item.price;
    this.updateCart();
  }

  this.getItemToBeRemoved = function (item) {
    var itemToBeRemvoed = {};
    $.each(this.current_order.items, function (id, currItem) {
      if (currItem.type == item.type) {
        itemToBeRemvoed = currItem;
        // To break from $.each function.
        return false;
      }
    })
    return itemToBeRemvoed;
  }

  this.unhighlightAllItems = function () {
    $(".highlight").removeClass("highlight");
  }

  this.appendItems = function (container) {
    var counter = 0;
    $.each(this.current_order.items, function (id, item) {
      var textString = ++counter + ") " +item.type.toUpperCase() + " : " + item.name;
      container.append($("<p/>", {text: textString}));
    })
  }

  this.emptyCartMessage = function () {
    var emptyMessageElem = $("#empty_cart_message");
    (Object.keys(this.current_order.items).length) ? emptyMessageElem.addClass("noDisplay") : emptyMessageElem.removeClass("noDisplay");
  }

  this.isItemAlreadyPresentInOrder = function (itemElem) {
    return itemElem.hasClass('highlight');
  }

  this.itemOfSameTypePresentInCart = function (type) {
    var returnValue = false;
    $.each(kioski.current_order.items, function (id, item) {
      if (item.type == type) {
        returnValue = true;
      }
    })
    return returnValue;
  }

  this.highlightItem = function (item) {
    $('#' + item.id).addClass('highlight');
  }

  this.unHighlightItem = function (item) {
    $('#' + item.id).removeClass('highlight');
  }

  this.updateCart = function () {
    this.cleanOrderSummary();
    var count = 0, orderSummary = $('#order_summary');
    $.each(this.current_order.items, function (id, item) {
      var textString = ++count + ") " + item.type.toUpperCase() + " : " + item.name + " = " + item.price;
      var elem = $("<p/>", {text: textString});
      orderSummary.append(elem);
    })
    $("#order_total").text(this.current_order.orderTotal);
  }

  this.cleanOrderSummary = function () {
    $('#order_summary').text("");
  }
}