$(document).ready(function () {
  // Display product section on click of Product tab in navigation bar
  $( "#productTab" ).bind("click", function () {
    $( ".tab" ).removeClass( "selected" );
    $(this).addClass( "selected" );
    $( "#myCart" ).addClass( "hidden" );
    $( '#product' ).removeClass( "hidden" );
  });

  // Display myCart section on click of "My Cart" tab in navigation bar
  $( "#myCartTab" ).bind("click", function () {
    $( ".tab" ).removeClass( "selected" );
    $(this).addClass( "selected" );
    $( "#product" ).addClass( "hidden" );
    $( '#myCart' ).removeClass( "hidden" );
  });
  $( "#productTab" ).trigger( "click" );

  // product JSON to list products. To add more product to cart add then in below JSON
  var productJSON = [{name: "1Dell Inspiron", category: "1Laptop", description: "1product of dell.", price: 31000, imgName: "bread.jpg"},
    {name: "2Apple Makbook", category: "2Laptop", description: "2product of dell.", price: 32000, imgName: "curry.jpg"},
    {name: "3Sony Vaio", category: "3Laptop", description: "3product of dell.", price: 33000, imgName: "fruit.jpg"}];

  // Create class Product
  function Product(productNumber) {
    this.quantity = 0;
    this.imgSrc = "images/" + productJSON[productNumber].imgName;
    this.number = productNumber;
    this.name = productJSON[productNumber].name;
    this.category = productJSON[productNumber].category;
    this.description = productJSON[productNumber].description;
    this.price = productJSON[productNumber].price;
    this.subtotal = 0;
  }

  // Create class Cart
  function Cart() {
    this.myCartList = {};
    this.total = 0;
    this.totalQtyInCart = 0;

    this.updateMyCartCount = function () {
      $( '#myCartTab'  ).text("My Cart ("+this.totalQtyInCart+")");
    };

    this.updateOrderTotalAndCount = function () {
      var cart = this;
      cart.total = 0; cart.totalQtyInCart = 0;
      $.each(this.myCartList, function (key, product) {
        cart.total += product.subtotal;
        cart.totalQtyInCart += product.quantity;
      });
      $( '#total' ).text("Total : "+cart.total+"");
      this.updateMyCartCount();
    };

    // On change in quantity input
    this.qtyOnChange = function ($qtyElem, product) {
      var cart = this;
      $qtyElem.bind("keyup", function () {
        var qty = $(this).val();
        product.quantity = (qty == "") ? 0 : parseInt(qty, 10);
        product.subtotal = product.quantity * product.price;
        cart.updateOrderTotalAndCount();
        updateMyCartDetais(product);
      });
    };

    this.addProductDetailsTo = function ($trElem, product, isMyCartSection) {
      var cart = this;
      $trElem.find( ".name" ).text(product.name);
      if (isMyCartSection) {
        var $qtyElem = $trElem.find( ".qtyInput" );
        $trElem.find( ".cartPrice" ).text(product.price);
        $qtyElem.val(product.quantity);
        this.qtyOnChange($qtyElem, product);
      } else {
        $trElem.find( ".category" ).text( "Category: "+product.category+"" );
        $trElem.find( ".description" ).text( "Description: "+product.description+"" );
        $trElem.find( ".price" ).text( "Price: "+product.price+"" );
      };
    };

    function removeElemHandler(product, $myCartTrElem, cart) {
      delete cart.myCartList[product.number];
      product.quantity = 0;
      cart.updateOrderTotalAndCount();
      $myCartTrElem.remove();
    };

    function updateMyCartDetais(product) {
      var $elem = $( "#"+product.number+"" );
      $elem.find( ".subTotal" ).text(product.subtotal);
      (product.quantity) ? $elem.find( ".qtyInput" ).val(product.quantity) : "";
    };

    this.updateProductAttributes = function (product, qty) {
      product.quantity = (qty) ? qty : product.quantity;
      product.subtotal = product.quantity * product.price;
    };

    this.addButtonOnClick = function (product, $productElem) {
      var cart = this, $addToCartElem = $productElem.find( '.addToCart' );
      $addToCartElem.bind("click", function () {
        var qty = parseInt($productElem.find( '.qtyInput' ).val(), 10);
        if (qty) {
          if (cart.myCartList.hasOwnProperty(product.number)) {
            qty += product.quantity;
            cart.updateProductAttributes(product, qty);
            cart.myCartList[product.number] = product;
            updateMyCartDetais(product);
            cart.updateOrderTotalAndCount();
          } else {
            cart.updateProductAttributes(product, qty);
            cart.myCartList[product.number] = product;
            var $myCartTrElem = $( '#cartTemplate' ).clone().removeClass( 'hidden' );
            $myCartTrElem.find( ".productImg" ).attr({src: product.imgSrc});
            $myCartTrElem.attr({id: product.number}).find( ".subTotal" ).text(product.subtotal);
            $( '#myCart' ).append($myCartTrElem);
            // Add details to myCart Elem
            cart.addProductDetailsTo($myCartTrElem, product, true);
            cart.updateOrderTotalAndCount();
            $myCartTrElem.find( ".remove" ).bind("click", function () {
              if (confirm("Are you sure want to remove "+product.name+" from Cart!!")) {
                removeElemHandler(product, $myCartTrElem, cart);
              }
            });
          }
          alert("Product : "+product.name+" added/updated in Cart!!");
        }
      });
    };

    this.displayProduct = function (product) {
      var $productElem = $( '#productTemplate' ).clone().removeClass( 'hidden' );
      $productElem.find( ".productImg" ).attr({src: product.imgSrc});
      // Third paramenter "false" is for "isMyCartSection" ie whether details are added to myCart(true) OR product(false)
      this.addProductDetailsTo($productElem, product, false);
      $( '#product' ).append($productElem.attr({id: "product"+product.number+""}));
      this.addButtonOnClick(product, $productElem);
    };
    
    this.displayProducts = function () {
      var length = productJSON.length;
      while (length--) {
        var product = new Product(length);
        this.currentProduct = product;
        this.displayProduct(product);
      }
    };
  };

  (function displayCart() {
    var cart = new Cart();
    cart.displayProducts();
  })();
})