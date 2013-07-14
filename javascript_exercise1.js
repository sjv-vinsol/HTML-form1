var main = {
  checkOrUncheck: function (value) {
    "use strict";
    var x = document.getElementsByClassName("checkbox"), i = x.length;
    while (i) {
      x[i-1].checked = value;
      i -= 1;
    }
  }, 
};