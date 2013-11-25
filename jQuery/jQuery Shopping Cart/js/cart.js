$(document).ready(function () {
  var cart = new Cart();
  cart.fetchDataAndInitializeCart();
});

// Create class Product
function Product(jsonValue, productNumber) {
  this.quantity = 0;
  this.imgSrc = "images/" + jsonValue.imgName;
  this.number = productNumber;
  this.name = jsonValue.name;
  this.category = jsonValue.category;
  this.description = jsonValue.description;
  this.price = jsonValue.price;
  this.subtotal = 0;
};

// Create class Cart
function Cart() {
  this.myCartList = {};
  this.total = 0;
  this.products = {};
  this.productJSON = {};

  this.fetchDataAndInitializeCart = function () {
    var cart = this;
    $.ajax({
      url: "data/products.json",
      dataType: "json",
      success: function(response) {
        cart.productJSON = response;
        cart.init();
      }
    })
  };

  this.init = function () {
    this.displayProducts();
    this.storeJqueryObjects();
    this.bindEvents();
    this.showDefaultList();
  };

  this.storeJqueryObjects = function () {
    this.productTab = $( '#productTab' );
    this.myCartTab = $( '#myCartTab' );
    this.productListSectionDiv = $( '#allProductList' );
    this.myCartProductsDiv = $( "#myCart" );
    this.productRecords = $( ".productRecord" ).not( "#productTemplate" );
  };

  this.bindEvents = function () {
    var cart = this;
    this.productTab.on('click', function() {
      cart.showProductList();
    });
    this.myCartTab.on('click', function() {
      cart.displayProductInMyCart();
    });
    $('body').delegate(".addToCart", "click", function() {
      cart.addToCart(this);
    });
    $("#search").on("click", function(){
      cart.searchProductsByCategory($(this));
    });
    $("#show_all_category").on("click", function () {
      cart.showAllProducts();
    });
  };

  this.addToCart = function (addToCartButton) {
    var $productElem = $(addToCartButton).closest('tr'), product = this.getProduct($productElem.attr("id"));
    var qty = parseInt($productElem.find('.qtyInput').val(), 10);
    if (qty) {
      if (this.isPresentInCart($productElem.attr('id'))) {
        this.updateCart(qty, product);
      }else {
        product.quantity = qty;
        product.subTotal = qty * product.price;
        this.addProductToCart(product);
      }
      alert("Product " + product.name + " successfully added/updated to cart!!!");
    }
  };

  this.updateCart = function (qty, product) {
    product.quantity += qty;
    product.subTotal = product.price * product.quantity;
    this.myCartList[product.number] = product.quantity;
    $cartProduct = $("#cart_product" + product.number);
    this.updateProductAttributes(product, $cartProduct, true);
    this.updateTotalAndCartCount();
  };
  
  this.addProductToCart = function(product) {    
    var $myCartTrElem = $( '#cartTemplate' ).clone().removeClass( 'hidden' ).attr("id", "cart_product" + product.number);
    $myCartTrElem.find( ".productImg" ).attr({src: product.imgSrc});
    this.myCartProductsDiv.append($myCartTrElem);
    this.bindEventOnRemoveButton($myCartTrElem, product);
    this.bindOnChangeEventOnQty($myCartTrElem, product);
    this.myCartList[product.number] = product.quantity;
    this.updateProductAttributes(product, $myCartTrElem, true);
    this.updateTotalAndCartCount();
  };

  this.bindOnChangeEventOnQty = function ($cartProduct, product) {
    var cart = this;
    $cartProduct.find(".qtyInput").on("change", function () {
      var qty = parseInt($(this).val(), 10);
      if (qty) {
        product.quantity = qty;
        cart.myCartList[product.number] = qty;
        product.subTotal = product.quantity * product.price;
        cart.updateSubtotal($cartProduct, product);
        cart.updateTotalAndCartCount();
      }else {
        cart.displayPreviousQtyValue($cartProduct, product);
      }
    })
  };

  this.bindEventOnRemoveButton = function ($cartProduct, product) {
    var cart = this;
    $cartProduct.find(".remove").on("click", function() {
      if (confirm("Are you sure want to remove " + product.name + " product from cart!!")) {
        product.quantity = 0;
        product.subtotal = 0;
        cart.removeProductFromMyCartList(product);
        $cartProduct.remove();
        cart.updateTotalAndCartCount();
      }
    })
  };

  this.displayProducts = function () {
    var productUniqueId = Object.keys(this.productJSON);
    var lengthOfproductJSON = productUniqueId.length;
    while (lengthOfproductJSON--) {
      var product = new Product(this.productJSON[productUniqueId[lengthOfproductJSON]], productUniqueId[lengthOfproductJSON]);
      this.products[productUniqueId[lengthOfproductJSON]] = product;
      this.displayProduct(product);
    }
  };

  this.displayProduct = function(product) {
    var $productElem = $( '#productTemplate' ).clone().removeClass( 'hidden' ).addClass("." + product.category);
    $productElem.find( ".productImg" ).attr({src: product.imgSrc});
    this.updateProductAttributes(product, $productElem, false);
    $( '#product' ).removeClass('hidden').append($productElem.attr({id: product.number}));
  };
};

Cart.prototype = {
  updateProductAttributes: function(product, $productElem, isCartProduct) {
    if (isCartProduct) {
      this.updateSubtotal($productElem, product);
      $productElem.find(".qtyInput").val(product.quantity);
    }
    $productElem.find('.name').text(product.name);
    $productElem.find('.category').text(product.category);
    $productElem.find('.description').text(product.description);
    $productElem.find('.price').text(product.price);
  },

  showDefaultList: function () {
    this.productTab.trigger("click");
  },

  removeProductFromMyCartList: function (product) {
    delete this.myCartList[product.number];
  },

  getProduct: function (productId) {
    return this.products[productId];
  },

  isPresentInCart: function (productId) {
    if (this.myCartList[productId]) return true;
    else return false;
  },

  updateTotalAndCartCount: function () {
    var cart = this, totalQtyInCart = 0;
    this.total = 0;
    $.each(this.myCartList, function (key, value) {
      cart.total += cart.products[key].subTotal;
      totalQtyInCart += cart.myCartList[key];
    })
    $('#total').text("Total : " + this.total);
    this.myCartTab.text("My Cart " + "(" + totalQtyInCart + ")");
  },

  showAllProducts: function() {
    this.productRecords.removeClass("hidden");
  },

  updateSubtotal: function ($cartProduct, product) {
    $cartProduct.find(".subTotal").text(product.subTotal);
  },

  showProductList: function() {
    $( ".tab" ).removeClass( "selected" );
    this.productTab.addClass( "selected" );
    this.myCartProductsDiv.addClass( "hidden" );
    this.productListSectionDiv.removeClass( "hidden" );
  },

  displayProductInMyCart: function () {
    $( ".tab" ).removeClass( "selected" );
    this.myCartTab.addClass( "selected" );
    this.productListSectionDiv.addClass( "hidden" );
    this.myCartProductsDiv.removeClass( "hidden" );
  },

  searchProductsByCategory: function ($button) {
    this.productRecords.removeClass("hidden");
    var inputCategory = $('#search_box').val().trim().toLowerCase();
    $.each(this.products, function(key, product) {
      var regex = new RegExp(inputCategory);
      if (!(regex.test(product.category.toLowerCase()))) {
        $("#" + product.number).addClass("hidden");
      }
    })
  },

  displayPreviousQtyValue: function ($cartProduct, product) {
    $cartProduct.find(".qtyInput").val(product.quantity);
  }
}