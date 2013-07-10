
function check(obj) {
  "use strict";
  document.getElementById("none").checked = false;
  var x = document.getElementsByClassName("checkbox"), count = checkForMax3(x);
  obj.checked = false;
  if (count > 3) {
    alert("Only 3 days can be selected.");
  }
  else {
    obj.checked = true;
  }
}

function checkForMax3(x) {
  "use strict";
  var c = 0, j = x.length - 1;
  while (j >= 0) {
    if (x[j].checked === true) {
      c += 1;
    }
    j -= 1;
  }
  return c;
}

function uncheckAll() {
  "use strict";
  var x = document.getElementsByClassName("checkbox"), j = x.length;
  for (var i=0;i<j;i++) {
    x[i].checked = false;
  }
}