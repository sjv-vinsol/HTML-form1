var storeJSON = [{"name": "1", "url": "1.jpg", "color": "Yellow", "brand": "BRAND A", "sold_out": "1"}, {"name": "2", "url": "2.jpg", "color": "Red", "brand": "BRAND B", "sold_out": "0"}, {"name": "3", "url": "3.jpg", "color": "Green", "brand": "BRAND D", "sold_out": "0"}, {"name": "4", "url": "4.jpg", "color": "Red", "brand": "BRAND A", "sold_out": "1"}, {"name": "5", "url": "5.jpg", "color": "Blue", "brand": "BRAND B", "sold_out": "0"}, {"name": "6", "url": "6.jpg", "color": "Green", "brand": "BRAND C", "sold_out": "0"}, {"name": "7", "url": "7.jpg", "color": "Red", "brand": "BRAND C", "sold_out": "1"}, {"name": "8", "url": "8.jpg", "color": "Blue", "brand": "BRAND D", "sold_out": "0"}, {"name": "9", "url": "9.jpg", "color": "Yellow", "brand": "BRAND A", "sold_out": "0"}, {"name": "10", "url": "10.jpg", "color": "Yellow", "brand": "BRAND B", "sold_out": "1"}, {"name": "11", "url": "11.jpg", "color": "Green", "brand": "BRAND D", "sold_out": "0"}, {"name": "12", "url": "12.jpg", "color": "Yellow", "brand": "BRAND D", "sold_out": "0"}, {"name": "13", "url": "13.jpg", "color": "Blue", "brand": "BRAND A", "sold_out": "0"}, {"name": "14", "url": "14.jpg", "color": "Blue", "brand": "BRAND D", "sold_out": "0"}, {"name": "15", "url": "15.jpg", "color": "Green", "brand": "BRAND B", "sold_out": "0"}, {"name": "16", "url": "16.jpg", "color": "Yellow", "brand": "BRAND B", "sold_out": "1"}, {"name": "17", "url": "17.jpg", "color": "Green", "brand": "BRAND A", "sold_out": "1"}, {"name": "18", "url": "18.jpg", "color": "Blue", "brand": "BRAND D", "sold_out": "1"}, {"name": "19", "url": "19.jpg", "color": "Green", "brand": "BRAND C", "sold_out": "0"}, {"name": "20", "url": "20.jpg", "color": "Yellow", "brand": "BRAND A", "sold_out": "0"}];
var selectBoxIdCollection = ["color", "brand", "name", "sold_out"];
var nameArr = [];

function Store() {
  "use strict";
  var getUniqueValueFor = function (idOfSelectBox) {
    var uniqueValueArr = [], productCount = storeJSON.length, count = 0, isUnique = true, i = 0;
    for (i = 0; i < productCount; i++) {
      count = uniqueValueArr.length;
      isUnique = true;
      while (count-- && isUnique) {
        if (storeJSON[i][idOfSelectBox] == uniqueValueArr[count]) { isUnique = false; }
      }
      if (isUnique) { uniqueValueArr.push(storeJSON[i][idOfSelectBox]); }
    }
    return uniqueValueArr.sort();
  };

  this.colors = getUniqueValueFor("color");
  this.brands = getUniqueValueFor("brand");
  this.populateSelectBoxWithColor = function () {
    addOptionsToSelectBox(this.colors, "color");
  };

  this.populateSelectBoxWithBrand = function () {
    addOptionsToSelectBox(this.brands, "brand");
  };

  this.populateSelectBoxWithName = function () {
    var length = storeJSON.length;
    while (length--) {
      nameArr.push(storeJSON[length].name);
    }
    this.names = nameArr;
    addOptionsToSelectBox(nameArr.reverse(), "name");
  };

  this.displayProductsAndAddEvents = function () {
    displayNewProducts(storeJSON);
    var length = selectBoxIdCollection.length;
    while (length--) {
      //Each execution context has its variable scope and thus the length value is maintained.
      (function (length) {
        document.getElementById(selectBoxIdCollection[length]).addEventListener("change", function () {
          filterProductsBy(selectBoxIdCollection[length]);
        });
      })(length);
    }
  };

  var addOptionsToSelectBox = function (uniqueValueArr, idOfSelectBox) {
    var fragment = document.createDocumentFragment();
    var length = uniqueValueArr.length, i = 0, optionElem = {};
    for (i = 0; i < length; i++) {
      optionElem = fragment.appendChild(document.createElement("option"));
      optionElem.value = uniqueValueArr[i];
      optionElem.innerHTML = uniqueValueArr[i];
    }
    document.getElementById(idOfSelectBox).appendChild(fragment);
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

  var filterProductsBy = function (idOfSelectBox) {
    var elemValue = document.getElementById(idOfSelectBox).value;
    setDefaultSelectedIndex(idOfSelectBox);
    var productJSON = [], i = 0;
    for (i = 0; i < storeJSON.length; i++) {
      if (elemValue == storeJSON[i][idOfSelectBox]) {
        productJSON.push(storeJSON[i]);
      }
    }
    displayNewProducts(productJSON);
  };

  var setDefaultSelectedIndex = function (idOfSelectBox) {
    var length = selectBoxIdCollection.length;
    while (length--) {
      if (idOfSelectBox != selectBoxIdCollection[length]) { document.getElementById(selectBoxIdCollection[length]).selectedIndex = 0 };
    }
  };
}

window.addEventListener("load", function () {
  "use strict";
  var store = new Store();
  store.populateSelectBoxWithColor();
  store.populateSelectBoxWithBrand();
  store.populateSelectBoxWithName();
  store.displayProductsAndAddEvents();
});