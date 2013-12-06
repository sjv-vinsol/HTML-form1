var navigationDelay = 200, displayTime = 1000;
$(document).ready(function () {
  var $slideshow = $("#slideshow").children("li").addClass("hidden"), navigation = $('<div/>', {id: "navigation"});
  var displaySlideshowDiv = $('<div/>').append($slideshow);
  $("body").prepend(displaySlideshowDiv);

  displayImageNumber($slideshow, navigation);

  highlightImageNumber(navigation, $slideshow, displaySlideshowDiv);
  
  var indexOfLastElem = $slideshow.last().index();

  function displayNextElem (indexOfVisibleElem) {
    $($navigationNumbers[indexOfVisibleElem]).removeClass( "redBackground" );
    var indexOfNextElem = (indexOfVisibleElem == indexOfLastElem) ? 0 : (indexOfVisibleElem + 1);
    $navigationNumbers.eq(indexOfNextElem).addClass( "redBackground" );
    $slideshow.eq(indexOfNextElem).fadeIn(navigationDelay);
  }

  setInterval(function(){
    var $visibleElem = $slideshow.filter( ":visible" );
    var indexOfVisibleElem = $visibleElem.index();
    $visibleElem.fadeOut(navigationDelay, function(){
      displayNextElem(indexOfVisibleElem);
    })
  }, displayTime);
})

function displayImageNumber ($slideshow, navigation) {
  for (i = 0; i < $slideshow.length; i++) {
    var elem = navigation.append($('<span/>', {id: i + 1, text: i + 1, class: "navigation"}));
  }
}

function highlightImageNumber (navigation, $slideshow, displaySlideshowDiv) {
  $navigationNumbers = navigation.insertAfter(displaySlideshowDiv).children( "span" );
  $slideshow.first().fadeIn(navigationDelay);
  $navigationNumbers.first().addClass( "redBackground" );
}