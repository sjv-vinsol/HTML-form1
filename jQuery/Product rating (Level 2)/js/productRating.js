$(document).ready(function () {

  var main = {
    productNames: ["Coffee", "tea", "Sodas", "Cake", "Drinks"].sort().reverse(),
    selectedHeader: {},
    selectedProduct: {},
    displayProducts: function () {
      var trElem = {}, length = main.productNames.length;
      while (length--) {
        trElem = $( "#rowTemplate" ).clone();
        trElem.find( ".radio" ).attr({name: main.productNames[length]});
        trElem.children( ".product" ).text(main.productNames[length]);
        trElem.appendTo($( "#productRating" ));
      };
      main.products = $( ".product" );
      main.headers = $( "#productRating th" );
      main.radioButtons = $( ".radio" );
    }
  };

  main.displayProducts();

  function handlerForHeaderClick() {
    var index = 0;
    main.headers.removeClass( "selected" );
    main.selectedHeader.addClass( "selected" );
    if (main.selectedProduct[0]) {
      index = main.selectedHeader.index();
      main.selectedProduct.parent().find( "td" ).eq(index).find( "input" ).trigger( "click" );
    }
  };

  main.products.bind("click", function () {
    main.products.removeClass( 'selected' );
    main.selectedProduct = $(this).addClass( "selected" );
  });

  main.headers.bind("click", function () {
    main.selectedHeader = $(this);
    if (main.selectedHeader[0] != main.headers[0]) {
      handlerForHeaderClick();
    }
  });

  main.radioButtons.bind("click", function () {
    var radioButton = $(this);
    main.headers.removeClass( "selected" );
    main.products.removeClass( "selected" );
    main.selectedHeader = main.headers.eq(radioButton.closest( 'td' ).index()).addClass( "selected" );
    main.selectedProduct = radioButton.closest( "tr" ).find( ".product" ).addClass( "selected" );
  });
});