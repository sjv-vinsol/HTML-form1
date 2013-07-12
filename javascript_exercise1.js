var main = {
  checkAll: function () {
    "use strict";
    main.checkOrUncheck(true);
  },

  checkOrUncheck: function (value) {
    "use strict";
    var x = document.getElementsByClassName("checkbox"), i = x.length;
    while (i) {
      x[i-1].checked = value;
      i -= 1;
    }
  },

  uncheckAll: function () {
    "use strict";
    main.checkOrUncheck(false);
  },
};