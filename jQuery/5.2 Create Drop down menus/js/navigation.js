$(document).ready(function () {
  function handlerIn() {
    $(this).children("ul").addClass("hover");
  }
  function handlerOut() {
    $(this).children("ul").removeClass("hover");
  }

  $('#nav').children('li').hover(handlerIn, handlerOut);
});