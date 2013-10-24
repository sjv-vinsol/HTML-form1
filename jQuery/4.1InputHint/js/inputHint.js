var searchElem = $("#searchField"), searchLabelElem = $("label[for='q']"), searchLabelVal = searchLabelElem.text();
searchElem.val(searchLabelVal).addClass("hint");
searchLabelElem.remove();
searchElem.focus(function () {
  if (searchElem.val() == searchLabelVal && jQuery.inArray("hint",searchElem.attr('class').split(" ")) >= 0) {
    searchElem.val("").removeClass("hint");
  }
});
searchElem.blur(function () {
  if (!searchElem.val().trim()) {
    searchElem.val(searchLabelVal).addClass("hint");
  }
});