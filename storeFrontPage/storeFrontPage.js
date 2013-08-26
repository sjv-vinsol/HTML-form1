var storeJSON = [{"name":"1","url":"1.jpg","color":"Yellow","brand":"BRAND A","sold_out":"1"},{"name":"2","url":"2.jpg","color":"Red","brand":"BRAND B","sold_out":"0"},{"name":"3","url":"3.jpg","color":"Green","brand":"BRAND D","sold_out":"0"},{"name":"4","url":"4.jpg","color":"Red","brand":"BRAND A","sold_out":"1"},{"name":"5","url":"5.jpg","color":"Blue","brand":"BRAND B","sold_out":"0"},{"name":"6","url":"6.jpg","color":"Green","brand":"BRAND C","sold_out":"0"},{"name":"7","url":"7.jpg","color":"Red","brand":"BRAND C","sold_out":"1"},{"name":"8","url":"8.jpg","color":"Blue","brand":"BRAND D","sold_out":"0"},{"name":"9","url":"9.jpg","color":"Yellow","brand":"BRAND A","sold_out":"0"},{"name":"10","url":"10.jpg","color":"Yellow","brand":"BRAND B","sold_out":"1"},{"name":"11","url":"11.jpg","color":"Green","brand":"BRAND D","sold_out":"0"},{"name":"12","url":"12.jpg","color":"Yellow","brand":"BRAND D","sold_out":"0"},{"name":"13","url":"13.jpg","color":"Blue","brand":"BRAND A","sold_out":"0"},{"name":"14","url":"14.jpg","color":"Blue","brand":"BRAND D","sold_out":"0"},{"name":"15","url":"15.jpg","color":"Green","brand":"BRAND B","sold_out":"0"},{"name":"16","url":"16.jpg","color":"Yellow","brand":"BRAND B","sold_out":"1"},{"name":"17","url":"17.jpg","color":"Green","brand":"BRAND A","sold_out":"1"},{"name":"18","url":"18.jpg","color":"Blue","brand":"BRAND D","sold_out":"1"},{"name":"19","url":"19.jpg","color":"Green","brand":"BRAND C","sold_out":"0"},{"name":"20","url":"20.jpg","color":"Yellow","brand":"BRAND A","sold_out":"0"}]
var colorArr = [], brandArr = [], nameArr = [];
//Populate color 
function populateUniqueValueFor(conditionString) {
  var uniqueValueArr = [];
  var productCount = storeJSON.length;
  for(i=0;i<productCount;i++) {
    var count = uniqueValueArr.length;
    var isUnique = true;
    while(count-- && isUnique) {
      if (eval(conditionString) == uniqueValueArr[count]) isUnique = false;
    }
    if (isUnique) uniqueValueArr.push(eval(conditionString));
  }
  return uniqueValueArr;
}

function addOptionsToSelectBox(uniqueValueArr, idOfSelectBox) {
  var fragment = document.createDocumentFragment();
  var length = uniqueValueArr.length
  for(i=0;i<length;i++) {
    var optionElem = fragment.appendChild(document.createElement("option"));
    optionElem.value = uniqueValueArr[i];
    optionElem.innerHTML = uniqueValueArr[i];
  }
  document.getElementById(idOfSelectBox).appendChild(fragment);
}

(function populateColor() {
  colorArr = populateUniqueValueFor("storeJSON[i].color");
  addOptionsToSelectBox(colorArr, "color");
})();

(function populateBrand() {
  brandArr = populateUniqueValueFor("storeJSON[i].brand");
  addOptionsToSelectBox(brandArr, "brand");
})();

(function populateName() {
  var length = storeJSON.length;
  while(length--) {
    nameArr.push(storeJSON[length].name);
  }
  addOptionsToSelectBox(nameArr.reverse(), "name");
})();
  

window.addEventListener("load", function() {
  (function displayProductsAndAddEvents() {
    displayNewProducts(storeJSON);
    document.getElementById("color").addEventListener("change", function() {
      filterProductsBy("color", "storeJSON[i].color");
    });
    document.getElementById("brand").addEventListener("change", function() {
      filterProductsBy("brand", "storeJSON[i].brand");
    });
    document.getElementById("name").addEventListener("change", function() {
      filterProductsBy("name", "storeJSON[i].name");
    });
    document.getElementById("stock").addEventListener("change", function() {
      filterProductsBy("stock", "storeJSON[i].sold_out");
    });
  })();

  function displayNewProducts(productJSON) {
    removeChildNodes(document.getElementById("container"));
    var fragment = document.createDocumentFragment();
    for(i=0;i<productJSON.length;i++) {
      var divElem = fragment.appendChild(document.createElement("div"));
      divElem.classList.add("productDiv");
      var imgElem = divElem.appendChild(document.createElement("img"));
      imgElem.src = "images/" + productJSON[i].url;
      imgElem.height = "150";
      imgElem.width = "150";
    }
    document.getElementById("container").appendChild(fragment);
    }

  function removeChildNodes(node) {
    while(node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

  function filterProductsBy(idOfSelectBox, conditionString) {
    var color = document.getElementById(idOfSelectBox).value;
    setDefaultSelectedIndex(idOfSelectBox);
    var productJSON = [];
    for(i=0;i<storeJSON.length;i++) {
      if(color == eval(conditionString)) {
        productJSON.push(storeJSON[i]);
      }
    }
    displayNewProducts(productJSON);
  }  

  function setDefaultSelectedIndex(idOfSelectBox) {
    if (idOfSelectBox != "color") document.getElementById("color").selectedIndex = 0;
    if (idOfSelectBox != "brand") document.getElementById("brand").selectedIndex = 0;
    if (idOfSelectBox != "name") document.getElementById("name").selectedIndex = 0;
    if (idOfSelectBox != "stock") document.getElementById("stock").selectedIndex = 0;
  }
})