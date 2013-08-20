var main = {
  checkAll: function (value) {
    "use strict";
    var x = document.getElementsByClassName("checkbox"), i = x.length;
    while (i--) {
      x[i].checked = value;
    }
  },
};