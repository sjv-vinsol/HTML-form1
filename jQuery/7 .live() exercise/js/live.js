var $divContainer = $(' <div/> ', {id: "divContainer"}), divNumber = 0;
var $addButton = $(' <input/> ', {id: "addButton", value: "Add Item", type: "button"});

$( 'body' ).append($addButton).append( $divContainer ).delegate( 'input#addButton', "click", function (event){
    $divContainer.append($( "<div/>" , {text: (++divNumber), class: "innerDiv grey"}));
})
  .delegate( 'div.innerDiv', "click", function (event){
    var $clickedDiv = $(event.target);
    if ($clickedDiv.is($divContainer.find(".innerDiv:last"))) {
      $clickedDiv.remove();
    }else {
      $clickedDiv.addClass( "heighlight" );
      $clickedDiv.siblings().removeClass( "heighlight" );
    }
  })