$(document).ready(function(){
  var countriesJSON = { leftCountries: ["India", "china", "nepal", "sri Lanka"], rightCountries: ["usa", "australia", "quatar", "new Zealand"]};

  $('#test').draggable();
  function appendCountriesToSelecBox(idOfCountryContainer) {
    var containerElem = $("#"+idOfCountryContainer+"");
    var length = countriesJSON[idOfCountryContainer].length;
    while (length--) {
      var optionElem = $('<option/>', {class: "country"}).text(countriesJSON[idOfCountryContainer][length]);
      containerElem.prepend(optionElem);
    }
  }
  appendCountriesToSelecBox("leftCountries");
  appendCountriesToSelecBox("rightCountries");

  function moveCountry (mouseMoveEventObj, initialMousePos, finalMousePos, $thisObj) {
    var initialElemPos = $thisObj.offset();
    console.log("Initial Mouse Pos  :   ", initialMousePos )
    console.log("Final Mouse Pos  :   ", finalMousePos )
    var changeInX = finalMousePos.X - initialMousePos.X;
    var changeInY = finalMousePos.Y - initialMousePos.Y;
    // Move the element by the exact change in mouse pointer
    $thisObj.offset({
      top: initialElemPos.top + changeInY,
      left: initialElemPos.left + changeInX
    });
  }

  $(".country").bind("mousedown", function(mouseDownEventObj){
    var initialMousePos = {}, finalMousePos = {}, $thisObj = $(this);
    // $thisObj.detach();
    $('body').bind('mousemove', function( mouseMoveEventObj) {
      console.log("@@@@@@@@@@@",$thisObj);
      initialMousePos = ($.isEmptyObject(finalMousePos)) ? {X: mouseMoveEventObj.clientX, Y: mouseMoveEventObj.clientY} : finalMousePos;
      finalMousePos = {X: mouseMoveEventObj.clientX, Y: mouseMoveEventObj.clientY};
      moveCountry(mouseMoveEventObj, initialMousePos, finalMousePos, $thisObj);
    })
  })

  $('body').bind("mouseup", function(event){
    console.log("!!!!!!!!!");
    $(this).unbind("mousemove");
  })

})
  