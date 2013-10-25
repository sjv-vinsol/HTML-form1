var searchElem = $("#search > input.input_text"), searchLabelElem = $("label[for='q']"), searchLabelVal = searchLabelElem.remove().text();
searchElem.val(searchLabelVal).addClass("hint");
searchElem.focus(function () {
  if (searchElem.val() == searchLabelVal && searchElem.hasClass("hint") == true) {
    searchElem.val("").removeClass("hint");
  }
});
searchElem.blur(function () {
  if (!searchElem.val().trim()) {
    searchElem.val(searchLabelVal).addClass("hint");
  }
});