$(document).ready(function () {
  var countriesJSON = { leftCountries: ["India", "China", "Nepal", "Sri Lanka"], rightCountries: ["Usa", "Australia", "Quatar", "New Zealand"]};

  function appendCountriesToSelecBox (idOfCountryContainer) {
    var containerElem = $("#"+ idOfCountryContainer +"");
    containerElem.html("");
    var soretedCountryArr = countriesJSON[idOfCountryContainer].sort();
    var length = countriesJSON[idOfCountryContainer].length, optionElem = {};
    while (length--) {
      optionElem = $('<p/>', {class: "country", id: soretedCountryArr[length]}).text(soretedCountryArr[length]);
      containerElem.prepend(optionElem);
    }
  }

  function sortJqueryObjectBy(attr, obj) {
    obj.sort(function(a, b) {
      return (a.getAttribute(attr) > b.getAttribute(attr));
    })
    return obj;
  }

  function onDifferentCountrySection(draggedElem, countrySection) {
    if (countrySection.is(draggedElem.parent())) return false
      else return true;
  }

  appendCountriesToSelecBox("leftCountries");
  appendCountriesToSelecBox("rightCountries");

  $('.country').draggable({revert: true});
  $('.selectBox').droppable({
    accept: ".country",
    over: function (event, elemObj) {
      if ( onDifferentCountrySection(elemObj.draggable, $(this))) {
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
      if (onDifferentCountrySection(draggedElem, droppableElem)) {
        var idOfCountryContainer = droppableElem.attr("id");
        // sort the children in droppableElem by Id
        // detach all the children of droppable counntries container
        var detachedCountries = droppableElem.children().detach();
        // detach dragged element from DOM and add it to detachedCountries array then sort it.
        var sortedElems = sortJqueryObjectBy("id", detachedCountries.add(draggedElem.detach()));
        droppableElem.append(sortedElems);
      }
    }
  });
});