$(document).ready(function () {
  var $slideshow = $("#slideshow").children("li").addClass("hidden"), navArea = $('<div/>', {id: "navigation"});
  var displaySlideshowDiv = $('<div/>').append($slideshow), navigationDelay = 200, displayTime = 1000;
  $("body").prepend(displaySlideshowDiv);

  // add image numbers to navigation area
  for (i = 0; i < $slideshow.length; i++) {
    var elem = navArea.append($('<span/>', {id: i + 1, text: i + 1, class: "navigation"}));
  }

  var $navigationNumbers = navArea.insertAfter(displaySlideshowDiv).children( "span" );
  $slideshow.first().fadeIn(navigationDelay);
  $navigationNumbers.first().addClass( "redBackground" );
  var indexOfLastElem = $slideshow.last().index();

  setInterval(function(){
    var $visibleElem = $slideshow.filter( ":visible" );
    var indexOfVisibleElem = $visibleElem.index();
    $visibleElem.fadeOut(navigationDelay, function(){
      $($navigationNumbers[indexOfVisibleElem]).removeClass( "redBackground" );
      var indexOfNextElem = (indexOfVisibleElem == indexOfLastElem) ? 0 : (indexOfVisibleElem + 1);
      $navigationNumbers.eq(indexOfNextElem).addClass( "redBackground" );
      $slideshow.eq(indexOfNextElem).fadeIn(navigationDelay);
    })
  }, displayTime);
})