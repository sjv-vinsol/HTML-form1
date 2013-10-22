var storeJSON = [{"name": "1", "url": "1.jpg", "color": "Yellow", "brand": "BRAND A", "sold_out": "1"}, {"name": "2", "url": "2.jpg", "color": "Red", "brand": "BRAND B", "sold_out": "0"}, {"name": "3", "url": "3.jpg", "color": "Green", "brand": "BRAND D", "sold_out": "0"}, {"name": "4", "url": "4.jpg", "color": "Red", "brand": "BRAND A", "sold_out": "1"}, {"name": "5", "url": "5.jpg", "color": "Blue", "brand": "BRAND B", "sold_out": "0"}, {"name": "6", "url": "6.jpg", "color": "Green", "brand": "BRAND C", "sold_out": "0"}, {"name": "7", "url": "7.jpg", "color": "Red", "brand": "BRAND C", "sold_out": "1"}, {"name": "8", "url": "8.jpg", "color": "Blue", "brand": "BRAND D", "sold_out": "0"}, {"name": "9", "url": "9.jpg", "color": "Yellow", "brand": "BRAND A", "sold_out": "0"}, {"name": "10", "url": "10.jpg", "color": "Yellow", "brand": "BRAND B", "sold_out": "1"}, {"name": "11", "url": "11.jpg", "color": "Green", "brand": "BRAND D", "sold_out": "0"}, {"name": "12", "url": "12.jpg", "color": "Yellow", "brand": "BRAND D", "sold_out": "0"}, {"name": "13", "url": "13.jpg", "color": "Blue", "brand": "BRAND A", "sold_out": "0"}, {"name": "14", "url": "14.jpg", "color": "Blue", "brand": "BRAND D", "sold_out": "0"}, {"name": "15", "url": "15.jpg", "color": "Green", "brand": "BRAND B", "sold_out": "0"}, {"name": "16", "url": "16.jpg", "color": "Yellow", "brand": "BRAND B", "sold_out": "1"}, {"name": "17", "url": "17.jpg", "color": "Green", "brand": "BRAND A", "sold_out": "1"}, {"name": "18", "url": "18.jpg", "color": "Blue", "brand": "BRAND D", "sold_out": "1"}, {"name": "19", "url": "19.jpg", "color": "Green", "brand": "BRAND C", "sold_out": "0"}, {"name": "20", "url": "20.jpg", "color": "Yellow", "brand": "BRAND A", "sold_out": "0"}];
var valuesToSort = ["color", "brand", "name", "sold_out"];

function Store() {
  "use strict";
  var getUniqueValueFor = function (attribute) {
    var uniqueValueArr = [], productCount = storeJSON.length, count = 0, isUnique = true, i = 0;
    for (i = 0; i < productCount; i++) {
      count = uniqueValueArr.length;
      isUnique = true;
      while (count-- && isUnique) {
        if (storeJSON[i][attribute] == uniqueValueArr[count]) { isUnique = false; }
      }
      if (isUnique) { uniqueValueArr.push(storeJSON[i][attribute]); }
    }
    return uniqueValueArr.sort();
  };

  // Stores the attribure value as array in store.
  this.populateValuesOfArrributes = function() {
    var length = valuesToSort.length
    while (length--) {
      var attribute = valuesToSort[length]
      if (attribute != "name") this[attribute] = getUniqueValueFor(attribute);
      else this.name = getNames();
    } 
  }

  var getNames = function () {
    var length = storeJSON.length, nameArr = [];
    while (length--) {
      nameArr.push(storeJSON[length].name);
    }
    return nameArr;
  };

  this.names = getNames();

  this.displayProductsAndAddEvents = function () {
    displayNewProducts(storeJSON);
    var length = valuesToSort.length, store = this;
    while (length--) {
      //Each execution context has its variable scope and thus the length value is maintained.
      (function (length) {
        document.getElementById("value").addEventListener("change", function (event) {
          sortProductsBy(event.target.value, store);
        });
      })(length);
    }
  };

  this.addOptionsToSelectBox = function () {
    var fragment = document.createDocumentFragment();
    var length = valuesToSort.length, i = 0, optionElem = {};
    for (i = 0; i < length; i++) {
      optionElem = fragment.appendChild(document.createElement("option"));
      optionElem.value = valuesToSort[i];
      optionElem.innerHTML = valuesToSort[i];
    }
    document.getElementById("value").appendChild(fragment);
  };

  var displayNewProducts = function (productJSON) {
    removeChildNodes(document.getElementById("container"));
    var fragment = document.createDocumentFragment(), i = 0, divElem = {}, imgElem = {};
    for (i = 0; i < productJSON.length; i++) {
      divElem = fragment.appendChild(document.createElement("div"));
      divElem.classList.add("productDiv");
      imgElem = divElem.appendChild(document.createElement("img"));
      imgElem.src = "images/" + productJSON[i].url;
      imgElem.height = "150"; imgElem.width = "150";
    }
    document.getElementById("container").appendChild(fragment);
  };

  var removeChildNodes = function (node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  };

  var sortProductsBy = function (attribute, store) {
    var productJSON = [];
    if (attribute == "name") productJSON = storeJSON;
    else {
      var sortedArr = (attribute) ? store[attribute].sort() : [], i = 0,j = 0;
      for (j = 0; j < sortedArr.length; j++) {
        for (i = 0; i < storeJSON.length; i++) {
          if (sortedArr[j] == storeJSON[i][attribute]) {
            productJSON.push(storeJSON[i]);
          }
        }
      }
    }
    displayNewProducts(productJSON);
  };
}

window.addEventListener("load", function () {
  "use strict";
  var store = new Store();
  store.addOptionsToSelectBox();
  store.populateValuesOfArrributes();
  store.displayProductsAndAddEvents();
});