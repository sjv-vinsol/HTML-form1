var $divContainer = $(' <div/> ', {id: "divContainer"}), id = 0;
var $addButton = $(' <input/> ', {id: "addButton", value: "Add Item", type: "button"});

$( 'body' ).prepend($addButton).prepend( $divContainer ).delegate( 'input#addButton', "click", function (event){
    $divContainer.append($( "<div/>" , {id: (id++), class: "innerDiv grey"}));
})
  .delegate( 'div.innerDiv', "click", function (event){
    var $clickedDiv = $(event.target), $innerDivs = $divContainer.children( ".innerDiv" );
    if ($clickedDiv.attr("id") == $innerDivs.last().attr("id")) {
      $innerDivs.last().remove();
    }else {
      $innerDivs.removeClass( "heighlight" );
      $clickedDiv.addClass( "heighlight" );
    }
  })