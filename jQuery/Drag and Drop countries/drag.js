$(document).ready(function () {
  var countriesJSON = { leftCountries: ["India", "China", "Nepal", "Sri Lanka"], rightCountries: ["Usa", "Australia", "Quatar", "New Zealand"]};

  function appendCountriesToSelecBox (idOfCountryContainer) {
    var sortedCountryArr = countriesJSON[idOfCountryContainer].sort();
    var length = countriesJSON[idOfCountryContainer].length, optionElem = {};
    while (length--) {
      optionElem = $('<p/>').attr({id: sortedCountryArr[length], class: "country"}).text(sortedCountryArr[length]);
      $("#"+ idOfCountryContainer).prepend(optionElem);
    }
  }

  function sortJqueryObjectBy(attr, obj) {
    obj.sort(function(a, b) {
      return (a.getAttribute(attr) > b.getAttribute(attr));
    })
    return obj;
  }

  function isPresentOnDifferentContainer(draggedElem, container) {
    return (!container.is(draggedElem.parent()));
  }

  appendCountriesToSelecBox("leftCountries");
  appendCountriesToSelecBox("rightCountries");

  $('.country').draggable({revert: true});
  $('.selectBox').droppable({
    accept: ".country",
    over: function (event, elemObj) {
      if ( isPresentOnDifferentContainer(elemObj.draggable, $(this))) {
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
      if (isPresentOnDifferentContainer(draggedElem, droppableElem)) {
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