var searchElem = $("input[name='q']");
var searchLabelVal = $("label[for='q']").text();
searchElem.val(searchLabelVal).addClass("hint");
$("label[for='q']").remove();
searchElem.focus(function () {
  if (searchElem.val() == searchLabelVal) {
    searchElem.val("").removeClass("hint");
  }
});
searchElem.blur(function () {
  if (!searchElem.val()) {
    searchElem.val(searchLabelVal).addClass("hint");
  }
});