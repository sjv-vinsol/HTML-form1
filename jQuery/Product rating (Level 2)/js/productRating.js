$(document).ready(function () {

  function ProductRating() {
    this.productNames = ["Coffee", "tea", "Sodas", "Cake", "Drinks", "Pizza"].sort().reverse();
    this.selectedHeader = {};
    this.selectedProduct = {};

    this.displayProducts = function () {
      var trElem = {}, length = this.productNames.length;
      while (length--) {
        trElem = $( "#rowTemplate" ).clone();
        trElem.find( ".radio" ).attr({name: this.productNames[length]});
        trElem.children( ".product" ).text(this.productNames[length]);
        trElem.appendTo($( "#productRating" ));
      };
      this.populateData();
    };

    this.populateData = function () {
      this.products = $( ".product" );
      this.headers = $( "#productRating th" );
      this.radioButtons = $( ".radio" );
      this.productsOnClick();
      this.headersOnClick();
      this.radioButtonsOnClick();
    };

    function handlerForHeaderClick (productRating) {
      var index = 0;
      productRating.headers.removeClass( "selected" );
      productRating.selectedHeader.addClass( "selected" );
      if (productRating.selectedProduct[0]) {
        index = productRating.selectedHeader.index();
        productRating.selectedProduct.parent().find( "td" ).eq(index).find( "input" ).trigger( "click" );
      }
    };

    this.productsOnClick = function () {
      var productRating = this;
      this.products.bind("click", function (event) {
        var checkedRadio = $(this).parent("#rowTemplate").find(".radio:checked");
        productRating.products.removeClass( 'selected' );
        productRating.selectedProduct = $(this).addClass( "selected" );     
        if (checkedRadio[0]) {
          productRating.headers.eq(checkedRadio.parent("td").index()).trigger("click");
        } else {
          if (!$.isEmptyObject(productRating.selectedHeader )) productRating.selectedHeader.trigger("click");
        }
      });
    };

    this.headersOnClick = function () {
      var productRating = this;
      this.headers.not("#blank").bind("click", function () {
        productRating.selectedHeader = $(this);
        handlerForHeaderClick(productRating);
      });
    };
       
    this.radioButtonsOnClick = function () {
      var productRating = this;
      this.radioButtons.bind("click", function () {
        var radioButton = $(this);
        productRating.headers.removeClass( "selected" );
        productRating.products.removeClass( "selected" );
        productRating.selectedHeader = productRating.headers.eq(radioButton.closest( 'td' ).index()).addClass( "selected" );
        productRating.selectedProduct = radioButton.closest( "tr" ).find( ".product" ).addClass( "selected" );
      });
    };
  };

  (function productRating() {
    var productRating = new ProductRating();
    productRating.displayProducts();
  })();
});