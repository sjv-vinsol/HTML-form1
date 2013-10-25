$(document).ready(function() {
  $.fn.hover = function(event) {
    if (event.type == "mouseenter") {
      this.children("ul").addClass("hover");
    }
    else {
      this.children("ul").removeClass("hover");
    }
  }

  $('#nav').children('li').bind("mouseenter mouseleave", function(event){
    $(this).hover(event);
  });
});