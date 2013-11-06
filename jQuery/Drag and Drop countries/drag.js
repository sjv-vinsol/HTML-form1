$(document).ready(function () {
  var countriesJSON = { leftCountries: ["India", "China", "Nepal", "Sri Lanka"], rightCountries: ["Usa", "Australia", "Quatar", "New Zealand"]};

  function appendCountriesToSelecBox(idOfCountryContainer) {
    var containerElem = $("#"+ idOfCountryContainer +"");
    var soretedCountryArr = countriesJSON[idOfCountryContainer].sort();
    var length = countriesJSON[idOfCountryContainer].length, optionElem = {};
    while (length--) {
      optionElem = $('<p/>', {class: "country"}).text(soretedCountryArr[length]);
      containerElem.prepend(optionElem);
    }
  }

  appendCountriesToSelecBox("leftCountries");
  appendCountriesToSelecBox("rightCountries");

  $('.country').draggable({revert: true});
  $('.selectBox').droppable({
    accept: ".country",
    over: function (event, elemObj) {
      if ($(this)[0] != elemObj.draggable.parent()[0]) {
        elemObj.draggable.addClass("yellow");
      }
    },
    out: function (event, elemObj) {
      elemObj.draggable.removeClass("yellow");
    },
    activate: function (event, elemObj) {
      elemObj.draggable.addClass("dragged");
    },
    deactivate: function (event, elemObj) {
      elemObj.draggable.removeClass("dragged");
    },
    drop: function (event, elemObj) {
      var draggedElem = elemObj.draggable, droppableElem = $(this);
      draggedElem.removeClass("yellow");
      if (droppableElem[0] != draggedElem.parent()[0]) {
        droppableElem.append(draggedElem);
      }
    }
  });
});