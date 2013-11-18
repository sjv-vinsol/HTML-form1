// Plugin hoverTabs
$.fn.hoverTabs = function (data) {
  var defaults = {
    tabsSelector: "." + data.hoverClass,
    optionsSelector: "." + data.displayClass,
  }
  defaults.optionElems = $(defaults.optionsSelector);
  defaults.tabs = $(defaults.tabsSelector);

  var options = $.extend({}, data, defaults);
  options.optionElems.hide();
  $('body').delegate( options.tabsSelector , "mouseenter", function(event) {
    var tab = $(this);
    options.optionElems.hide();
    options.optionElems.eq(tab.index(options.tabsSelector)).slideDown();
  })
    .delegate( options.tabsSelector, "mouseleave", function(event) {
      options.optionElems.eq($(this).index("." + options.hoverClass)).slideUp();
  })
}

// Call the plugin
$('body').hoverTabs({hoverClass: 'header', displayClass: 'options'});

$('body').delegate( ".header", "mouseenter", function() {
  $(this).find('p').addClass("hoverTab");
})
   .delegate(".header", "mouseleave", function(){
    $(this).find('p').removeClass("hoverTab");
   })