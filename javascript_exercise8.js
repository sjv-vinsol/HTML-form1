window.addEventListener("load", function () {
  document.getElementById("button1").addEventListener("click", function () { main.transferCountriesFrom("container1", "container2")});
  document.getElementById("button2").addEventListener("click", function (){main.transferCountriesFrom("container2", "container1")});
  var main = {
    transferCountriesFrom: function (id1, id2) {
      "use strict";
      var valueC = document.getElementById(id1).value;
      if(valueC) {
        var elem = main.searchSelected(id1, valueC);
        document.getElementById(id2).appendChild(elem);
      }
    },
    searchSelected: function (id, valueC) {
      "use strict";
      var elemArr = document.getElementById(id).getElementsByTagName("option");
      var length = elemArr.length;
      while(length--) {
        if (elemArr[length].value == valueC) { return(elemArr[length]) }
      }
      return false;
    }
  }
})
