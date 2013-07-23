window.addEventListener("load", function () {
  document.getElementById("button1").addEventListener("click", function () {main.transferCountriesFrom("container1", "container2")});
  document.getElementById("button2").addEventListener("click", function () {main.transferCountriesFrom("container2", "container1")});
  var main = {
    transferCountriesFrom: function (id1, id2) {
      "use strict";
      var container = document.getElementById(id1);
      if(container.value) {
        var elem = container.options[container.selectedIndex];
        document.getElementById(id2).appendChild(elem);
      }
    }    
  }
})
