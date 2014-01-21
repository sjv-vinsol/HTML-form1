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

  this.getDisplayString = function (count) {
    return count + ") " + this.type.toUpperCase() + " : " + this.name + " = " + this.price;
  }
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
    $.each(menuJSON, function(section_name,values){
      var section = $('<div/>', {id: section_name, class: 'item_list_by_type'});
      displayHeader(section, section_name);
      $.each(values, function(name, price) {
        var item = new Item(name, price, section_name);
        kioski.displayItem(item, section);
      })
      $('#menu_container').append(section);
    })
  }

  this.displayItem = function (item, section) {
    var text = item.name + " (" + item.price + ") ";
    var itemElem = $('<p/>', {text: text, id: item.id , class: "item "+item.type+""});
    this.itemsCollection[item.id] = item;
    section.append(itemElem);
  }

  function displayHeader(elem, section_name) {
    elem.append($('<p/>', {class: 'section_name', text: section_name.toUpperCase()}));
  }

  this.placeOrderHandler = function () {
    if (this.cartIsNotEmpty()) {
      var name = prompt("Enter your name!!");
      if (this.validateName(name)) {
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

  this.validateName = function (name) {
    return this.validNameRegex.test(name.trim());
  }

  this.addToCartHandler = function (itemElem) {
    var item = this.itemsCollection[itemElem.attr("id")];
    if (this.isCartHasItemWithSame("id", item.id)) {
      this.removeItemFromCurrentOrder(item);
    } else if (this.isCartHasItemWithSame("type", item.type)) {
      this.removeItemFromCurrentOrder(this.getItemToBeRemoved(item));
      this.addItemToCurrentOrder(item);
    } else {
      this.addItemToCurrentOrder(item);
    }
    this.emptyCartMessage();
  }

  this.displayFinalOrder = function () {
    var orderItemsColection = [], counter = 0;
    $.each(this.current_order.items, function (key, item) {
      orderItemsColection.push(item.getDisplayString(++counter));
    })

    var order = {orderId: this.orders.length,
      orderTotal: this.current_order.orderTotal,
      customerName: this.current_order.customerName,
      stringCollection: orderItemsColection
    };

    $("#order_template").tmpl(order).appendTo("#finalOrders");
    this.displayOrdersSection();
  }

  this.displayOrdersSection = function () {
    $("#finalOrders").removeClass("hidden");
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
      container.append($("<p/>", {text: item.getDisplayString(++counter)}));
    })
  }

  this.emptyCartMessage = function () {
    var emptyMessageElem = $("#empty_cart_message");
    if (this.totalItemsInCart()) {
      emptyMessageElem.addClass("noDisplay");
    }else {
      emptyMessageElem.removeClass("noDisplay");
    }
  }

  this.totalItemsInCart = function () {
    return Object.keys(this.current_order.items).length
  }

  this.isCartHasItemWithSame = function (attr, val) {
    var returnValue = false;
    $.each(kioski.current_order.items, function (id, item) {
      if (item[attr] == val) {
        returnValue = true;
      }
    })
    return returnValue;
  }

  this.highlightItem = function (item) {
    $(this.idSelector(item.id)).addClass('highlight');
  }

  this.idSelector = function (id) {
    return "#" + id;
  }

  this.unHighlightItem = function (item) {
    $(this.idSelector(item.id)).removeClass('highlight');
  }

  this.updateCart = function () {
    this.cleanOrderSummary();
    var count = 0, orderSummary = $('#order_summary');
    $.each(this.current_order.items, function (id, item) {
      var elem = $("<p/>", {text: item.getDisplayString(++count)});
      orderSummary.append(elem);
    })
    $("#order_total").text(this.current_order.orderTotal);
  }

  this.cleanOrderSummary = function () {
    $('#order_summary').text("");
  }
}