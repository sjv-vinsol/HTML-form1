var $moduleElem = $( ".module" ).hide();
var $moduleList = $( "<ul/>", {id: "moduleList"} ).insertBefore($moduleElem.first());

$.each($moduleElem, function() {
  var h2ElemText = $(this).children("h2").text();
  $liElem = $( "<li/>", {id: "new" + h2ElemText, class: "ulList", text: h2ElemText} ).appendTo($moduleList);
  (function bindClickEvent ($liElem) {
    $liElem.on( "click", function(event){
    	$('.ulList').removeClass('current');
    	$liElem.addClass('current');
      $moduleElem.filter(':visible').hide();
      $moduleElem.eq($liElem.index()).show();
    })
  })($liElem);
})
$('.ulList').first().trigger("click");