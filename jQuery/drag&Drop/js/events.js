$(document).ready(function() {
  var $divElem = $('<div/>', {class: "drag"});
  $('body').prepend([$('<div/>', {class: "drag"}),$('<div/>', {class: "drag"}), $divElem ])

  $(".drag").css({
    padding: "10px", 
    backgroundColor: "grey",
    margin: "3px",
    marginBottom: "50px",
    marginTop: "30px",
    width: "40px",   
    height: "50px",
    cursor: "default"
  });

  $.each($('.drag'), function(index, value){    
    $(this).attr({id: index+1}).text("Div"+(index+1));    
  })

  var initial = {};
  var final = {};

  function handler(e, event, thisObj) { 
    initial = (!$.isEmptyObject(final)) ? final : ({X: event.clientX, Y: event.clientY});
    final = {X: e.clientX, Y: e.clientY};
    var changeInX = final.X - initial.X;
    var changeInY = final.Y - initial.Y;
    var beforePosition = thisObj.offset();
    thisObj.offset({
      top: beforePosition.top + changeInY,
      left: beforePosition.left + changeInX
    })
  }

  $(".drag").bind("mousedown", function(event){
    event.preventDefault();
    var $thisObj = $(this);
    initial = {};
    final = {};
    $('body').bind( "mousemove", function(e){
      handler(e, event, $thisObj);        
    });
  });

  $('body').bind("mouseup", function(){
    console.log("asfdasdf");
    $("body").unbind("mousemove");
  });
})