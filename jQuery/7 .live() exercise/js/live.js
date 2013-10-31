var $divContainer = $(' <div/> ', {id: "divContainer"}), noOfDivs = 0;
var $addButton = $(' <input/> ', {id: "addButton", value: "Add Item", type: "button"});

$( 'body' ).prepend($addButton).prepend( $divContainer ).delegate( 'input#addButton', "click", function (event){
    $divContainer.append($( "<div/>" , {text: ++noOfDivs, class: "innerDiv"})); 
})
  .delegate( 'div.innerDiv', "click", function (event){
    var $clickedDiv = $(event.target), $innerDivs = $divContainer.children( ".innerDiv" );
    if ($clickedDiv.text() == $innerDivs.last().text()) {
      noOfDivs--;
      $innerDivs.last().remove();
    }else {
      $innerDivs.removeClass( "heighlight" );
      $clickedDiv.addClass( "heighlight" );
    }
  })