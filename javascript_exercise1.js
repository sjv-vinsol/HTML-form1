
function checkAll(x) {
  "use strict";
  var x = document.getElementsByClassName("checkbox"), i = x.length;
  while (i) {
    x[i-1].checked = true;
    i -= 1;
  }
}

function uncheckAll() {
  "use strict";
  var x = document.getElementsByClassName("checkbox"), i = x.length;
  while (i) {
    x[i-1].checked = false;
    i -= 1;
  }
}