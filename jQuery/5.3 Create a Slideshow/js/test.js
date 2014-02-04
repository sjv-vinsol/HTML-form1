function Slideshow() {
  this.navigationDelay = 200;
  this.displayTime = 1000;
  this.slideshowElems = $("#slideshow").children("li");
  this.indexOfLastElem = this.slideshowElems.last().index();

  this.init = function () {
    this.hideSlideShowElems();
    this.displaySlideShow();
    this.displayImageNumber();
    this.highlightImageNumber();
    this.start();
  }

  this.start = function () {
    var slideshow = this;
    setInterval(function(){
      var visibleElem = this.slideshowElems.filter( "li:visible" );
      var indexOfVisibleElem = visibleElem.index();
      visibleElem.fadeOut(slideshow.navigationDelay, function(){
        displayNextElem(indexOfVisibleElem);
      })
    }, slideshow.displayTime)
  }

  this.displayNextElem = function (indexOfVisibleElem) {
    this.navigationNumbers.eq(indexOfVisibleElem).removeClass( "redBackground" );
    var indexOfNextElem = (indexOfVisibleElem == this.indexOfLastElem) ? 0 : (indexOfVisibleElem + 1);
    this.navigationNumbers.eq(indexOfNextElem).addClass( "redBackground" );
    this.slideshowElems.eq(indexOfNextElem).fadeIn(this.navigationDelay);

  }

  this.displaySlideShow = function () {
    this.slideShowContainer = $('<div/>').append(this.slideshowElems);
    $("body").prepend(this.slideShowContainer);
  }

  this.displayImageNumber = function () {
    var navigation = $('<div/>', {id: "navigation"});
    for (i = 0; i < this.slideshowElems.length; i++) {
      navigation.append($('<span/>', {id: i + 1, text: i + 1, class: "navigation"}));
    }
  }

  this.highlightImageNumber = function () {
    this.navigationNumbers = navigation.insertAfter(displaySlideshowDiv).children( "span" );
    $slideshow.first().fadeIn(slideshow.navigationDelay);
    this.navigationNumbers.first().addClass( "redBackground" );
  }

  this.hideSlideShowElems = function () {
    this.slideshowElems.addClass("hidden");
  }  
}