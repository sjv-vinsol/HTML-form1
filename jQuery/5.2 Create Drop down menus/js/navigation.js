$(document).ready(function() {
  $('#nav').children('li').hover(function(event){
    $(this).children("ul").addClass("hover");
  }, function() {
    $(this).children("ul").removeClass("hover");
  });
});