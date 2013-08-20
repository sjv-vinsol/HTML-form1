
(function selectMax3Days(doc) {
  check = function (obj) {
    "use strict";
    var days = doc.getElementsByClassName("days"), checked = obj.checked;
    doc.getElementById("none").checked = false;
    obj.checked = false;
    if (!moreThan3Selected(days)) {
      obj.checked = checked;
    }
  }

   moreThan3Selected = function (days) {
    "use strict";
    var c = 0, j = days.length;
    while (--j >= 0 ) {
      if (days[j].checked === true) {
        if (++c >= 3) {
          alert("Only 3 days can be selected.");
          return true;
        }
      }
    }
    return false;
  }

  uncheckAll = function () {
    "use strict";
    var days = doc.getElementsByClassName("days"), j = days.length;
    while (--j >= 0) {
      days[j].checked = false;
    }
  }
})(document);