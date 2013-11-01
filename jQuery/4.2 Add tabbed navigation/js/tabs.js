var $moduleElem = $( ".module" ).addClass( "hidden" );
var $moduleList = $( "<ul/>", {id: "moduleList"} ).insertBefore($moduleElem.first());

$.each($moduleElem, function() {
  $contentOfUl = $(this).children().hide();
  $h2Elem = $contentOfUl.filter( "h2" );
  var h2ElemText = $h2Elem.text();
  $liElem = $( "<li/>", {id: "new" + h2ElemText, class: "ulList", text: h2ElemText} ).appendTo($moduleList).append($h2Elem.siblings());
  $liElem.bind( "click", function(event){
    var that = this;
    (function handler(h2ElemText) {
      if ($(event.target).attr( "id" ) == ("new" + h2ElemText)) {
        $(that).siblings().removeClass( 'current grey' ).children().hide();
        $(that).toggleClass( 'current grey' ).children().toggle();
      }
    })(h2ElemText);
  })
})