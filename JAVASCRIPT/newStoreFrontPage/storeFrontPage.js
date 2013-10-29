var storeJSON1 = [{"name": "1", "url": "1.jpg", "color": "Yellow", "brand": "BRAND A", "sold_out": "1"}, {"name": "2", "url": "2.jpg", "color": "Red", "brand": "BRAND B", "sold_out": "0"}, {"name": "3", "url": "3.jpg", "color": "Green", "brand": "BRAND D", "sold_out": "0"}, {"name": "4", "url": "4.jpg", "color": "Red", "brand": "BRAND A", "sold_out": "1"}, {"name": "5", "url": "5.jpg", "color": "Blue", "brand": "BRAND B", "sold_out": "0"}, {"name": "6", "url": "6.jpg", "color": "Green", "brand": "BRAND C", "sold_out": "0"}, {"name": "7", "url": "7.jpg", "color": "Red", "brand": "BRAND C", "sold_out": "1"}, {"name": "8", "url": "8.jpg", "color": "Blue", "brand": "BRAND D", "sold_out": "0"}, {"name": "9", "url": "9.jpg", "color": "Yellow", "brand": "BRAND A", "sold_out": "0"}, {"name": "10", "url": "10.jpg", "color": "Yellow", "brand": "BRAND B", "sold_out": "1"}, {"name": "11", "url": "11.jpg", "color": "Green", "brand": "BRAND D", "sold_out": "0"}, {"name": "12", "url": "12.jpg", "color": "Yellow", "brand": "BRAND D", "sold_out": "0"}, {"name": "13", "url": "13.jpg", "color": "Blue", "brand": "BRAND A", "sold_out": "0"}, {"name": "14", "url": "14.jpg", "color": "Blue", "brand": "BRAND D", "sold_out": "0"}, {"name": "15", "url": "15.jpg", "color": "Green", "brand": "BRAND B", "sold_out": "0"}, {"name": "16", "url": "16.jpg", "color": "Yellow", "brand": "BRAND B", "sold_out": "1"}, {"name": "17", "url": "17.jpg", "color": "Green", "brand": "BRAND A", "sold_out": "1"}, {"name": "18", "url": "18.jpg", "color": "Blue", "brand": "BRAND D", "sold_out": "1"}, {"name": "19", "url": "19.jpg", "color": "Green", "brand": "BRAND C", "sold_out": "0"}, {"name": "20", "url": "20.jpg", "color": "Yellow", "brand": "BRAND A", "sold_out": "0"}];
// Put the values to sort in below array. Only below mentioned values will be show in the dropdown to sort.
var valuesToSort = ["color", "brand", "name", "sold_out"];

// #FIXME_AB: it would be good if we can specify the json to be used while creating the store object
function Store(storeJSON) {
  "use strict";
  this.display = function () {
    // #FIXME_AB_h_1.0: I think we can use this.displayProductGrid using event bind
    displayProductGrid(storeJSON);
    this.addOptionsToSelectBox();
    this.addOnChangeHandlerToSelectBox();
  }

  this.addOnChangeHandlerToSelectBox = function () {
    var length = valuesToSort.length;
    // #FIXME_AB: use bind
    document.getElementById("sortBy").addEventListener("change", function(event) {
      displayProductGrid(sortJSONBy(event.target.value));
    }.bind(this));    
  };

  var sortJSONBy = function (attribute) {
    // #FIXME_AB_h_1.0: Always use second parameter with parseInt or parseFloat 
    var isInteger = (parseInt(storeJSON[1][attribute], 10) == storeJSON[1][attribute]) ? true : false;
    if (isInteger) {
      return (storeJSON.sort(function(a,b) {
        return (parseInt(a[attribute], 10) - parseInt(b[attribute], 10));
      }))
    } else {
      return (storeJSON.sort(function(a,b) {
        var x = a[attribute], y = b[attribute];
        return ((x > y) ? 1 : ((x < y) ? -1 : 0));
      }))
    }
  }

  this.addOptionsToSelectBox = function () {
    var fragment = document.createDocumentFragment();
    var length = valuesToSort.length, i = 0, optionElem = {};
    for (i = 0; i < length; i++) {
      optionElem = fragment.appendChild(document.createElement("option"));
      optionElem.value = valuesToSort[i];
      optionElem.innerHTML = valuesToSort[i];
    }
    document.getElementById("sortBy").appendChild(fragment);
  };

  var displayProductGrid = function (productJSON) {
    clearProductGrid(document.getElementById("container"));
    var fragment = document.createDocumentFragment(), i = 0, divElem = {}, imgElem = {};
    for (i = 0; i < productJSON.length; i++) {
      divElem = fragment.appendChild(document.createElement("div"));
      divElem.classList.add("productDiv");
      imgElem = divElem.appendChild(document.createElement("img"));
      imgElem.src = "images/" + productJSON[i].url;
      // #FIXME_AB: don't do inline styles. use css classes 
      imgElem.classList.add("imgElemDimention");
    }
    document.getElementById("container").appendChild(fragment);
  };

  var clearProductGrid = function (myNode) {
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
  };
}

window.addEventListener("load", function () {
  "use strict";
  var store = new Store(storeJSON1);
  store.display();
});