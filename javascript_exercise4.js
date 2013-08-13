var data = {color: ["red", "yellow", "green", "blue"], movies: ["dar", "sir"], drinks: ["coke", "pepsi", "dew"], bikes: ["v-rod", "pulsar", "cbz"]}
var main = {
  showOrRemoveList: function (that) {
    "use strict";
    var containerDiv = that.parentNode;
    if (containerDiv.getElementsByClassName("optionContainer")[0].checked == true) {
      if (!containerDiv.getElementsByClassName("innerCheckbox").length) {
        main.appendInnerCheckbox(that);
      }
      main.changeStatusOfInnerCheckbox("check", containerDiv);
      containerDiv.parentNode.scrollTop = containerDiv.offsetTop;
    } else {
      main.changeStatusOfInnerCheckbox("uncheck", containerDiv);
      containerDiv.removeChild(containerDiv.getElementsByClassName("innerCheckbox")[0]);
    }
  },

  appendInnerCheckbox: function (currentElem) {
    "use strict";
    var fragment = document.createDocumentFragment(), elemDiv = fragment.appendChild(document.createElement("div")), len = 0;
    elemDiv.classList.add("innerCheckbox");
    var valueArr = data[currentElem.id];
    while (len < valueArr.length) {
      var elemInput = elemDiv.appendChild(document.createElement("input"));
      elemInput.classList.add("options");
      main.setAttributes(elemInput, ["type", "checkbox", "onclick", "main.confirmAllCheckbox(this.parentNode)","value", valueArr[len]]);
      elemDiv.appendChild(document.createTextNode(valueArr[len++].toUpperCase()));
      elemDiv.appendChild(document.createElement("br"));
    }
    currentElem.parentNode.appendChild(elemDiv);
  },

  confirmAllCheckbox: function (elemDiv) {
    "use strict";
    //check the status of all checkbox
    var innerCheckboxArr = elemDiv.getElementsByClassName("options"), len = innerCheckboxArr.length, count = 0;
    while (len) {
      if (innerCheckboxArr[(--len)].checked) {
        break;
      } else {
        count++;
      }
    }
    if (count == innerCheckboxArr.length) {
      elemDiv.parentNode.getElementsByClassName("optionContainer")[0].checked = false;
    } else {
      elemDiv.parentNode.getElementsByClassName("optionContainer")[0].checked = true;
    }
  },

  setAttributes: function (obj, attr) {
    "use strict";
    var len = 0;
    while(len < attr.length ) {
      obj.setAttribute(attr[len++], attr[len++]);
    }
  },
  
  changeStatusOfInnerCheckbox: function (state, containerDiv) {
    "use strict";
    var value = (state == "check") ? true : false, elemArr = containerDiv.getElementsByClassName("options"), len = elemArr.length;
    while (len) {
      elemArr[--len].checked = value;
    }
  }
};