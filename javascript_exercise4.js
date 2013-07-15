
var main = {  
// variable name is same as the Id of the main checkbox
  color: ["red", "yellow", "green", "blue"],
  movies: ["dar", "sir"],
  drinks: ["coke", "pepsi", "dew"],
  bikes: ["v-rod", "pulsar", "cbz"],

  showOrRemoveList: function (that) {
    "use strict";
    var that = that.parentNode;
    if (that.getElementsByTagName("input")[0].checked == true) {
      if (!that.getElementsByTagName("div").length) {
        main.appendInnerCheckbox(that);
      }
      main.statusOfInnerCheckbox("check", that);
      that.parentNode.scrollTop = that.offsetTop;
    } else {
      main.statusOfInnerCheckbox("uncheck", that);
      that.removeChild(that.getElementsByTagName("div")[0]);
    }
  },

  appendInnerCheckbox: function (that) {
    "use strict";
    var len = 0;
    var fragment = document.createDocumentFragment();
    var elemDiv = fragment.appendChild(document.createElement("div"));
    main.setAttributes(elemDiv, ["class", "innerCheckbox"]);
    var valueArr = main.getValueOfInnerCheckbox(that);
    while (len < valueArr.length) {
      var input = elemDiv.appendChild(document.createElement("input"));
      var attr = ["type", "checkbox", "onclick", "main.confirmAllCheckbox(this)","value", valueArr[len]];
      main.setAttributes(input, attr);
      elemDiv.appendChild(document.createTextNode(valueArr[len++].toUpperCase()));
      elemDiv.appendChild(document.createElement("br"));
    }
    that.appendChild(elemDiv);
  },

  confirmAllCheckbox: function (that) {
    "use strict";
    //check the status of all checkbox
    var inputTags = that.parentNode.getElementsByTagName("input");
    var len = inputTags.length;
    var count = 0;
    while (len) {
      if (inputTags[(--len)].checked) {
        break;
      } else {
        count++;
      }
    }
    if (count == inputTags.length) {
      that.parentNode.parentNode.getElementsByTagName("input")[0].checked = false;
    } else {
      that.parentNode.parentNode.getElementsByTagName("input")[0].checked = true;
    }
  },

  setAttributes: function (obj, attr) {
    "use strict";
    var length = 0;
    while(length < attr.length ) {
      obj.setAttribute(attr[length++], attr[length++]);
    }
  },

  getValueOfInnerCheckbox: function (that) {
    "use strict";
    switch(parseInt(that.id, 10)) {
      case 1: {
        return main.color;
      }
      break;
      case 2: {
        return main.movies;
      }
      break;
      case 3: {
        return main.drinks;
      }
      break;
      case 4: {
        return main.bikes;
      }
      break;
    }
  },

  statusOfInnerCheckbox: function (state, parent) {
    "use strict";
    var value = (state == "check") ? true : false;
    var elem = parent.getElementsByTagName("div")[0].getElementsByTagName("input");
    var len = elem.length;
    while (len) {
      elem[--len].checked = value;
    }
  }
};