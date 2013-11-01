(function($) {
  $.fn.greenify = function(options) {
    var object = $.extend({color: "green"}, options); 
    // console.log("@@@@@",object);
    return (this.css({
        color: object.color,
        backgroundColor: object.backgroundColor
      })
    )
  }
  //console.log("asasfd",$("#blog").find('a').greenify());
  $(".module").greenify({color: "blue", backgroundColor: "grey"});
})(jQuery);