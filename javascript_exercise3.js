//http://stackoverflow.com/questions/7476638/if-people-recommend-i-shouldnt-use-innerhtml-what-then-should-i-instead-use
var main =  {
  id: 1,
  table: document.getElementById("table"),
  addNewRow: function () {
    "use strict";
    var newElemTr = main.createInputFragment();
    if (!table.getElementsByTagName("td").length) {
      document.getElementById("container").removeChild(document.getElementById("noData"));
    }
    table.appendChild(newElemTr);
  },

  createInputFragment: function (currentElemId) {
    "use strict";
    var newFrgment = document.createDocumentFragment(), newElemTr = newFrgment.append(["tr"]);
    var newId = (currentElemId) ? currentElemId : main.id++;
    newElemTr.setAttribute("id", ""+newId+"");
    var tdElemArr = newElemTr.append(["sibling", "td", "td", "td"]);
    var name = tdElemArr[0].append(["input"]), email = tdElemArr[1].append(["input"]),  save = tdElemArr[2].append(["input"]);
    name.classList.add("name"); email.classList.add("email");
    main.setAttribute(name,["type", "text"]);
    main.setAttribute(email, ["type", "email"]);
    main.setAttribute(save, ["type", "button", "value", "save", "id", "save", "onclick", "main.save(this.parentNode.parentNode)"]);
    return newElemTr;
  },

  createDisplayFragment: function (currentElemTr) {
    "use strict";
    var newFrgment = document.createDocumentFragment(), newElemTr = newFrgment.append(["tr"]);
    newElemTr.setAttribute("id", currentElemTr.id);
    var tdElemArr = newElemTr.append(["sibling", "td", "td", "td"]);
    tdElemArr[0].appendChild(document.createTextNode(currentElemTr.getElementsByClassName("name")[0].value));
    tdElemArr[0].classList.add("name");
    tdElemArr[1].appendChild(document.createTextNode(currentElemTr.getElementsByClassName("email")[0].value));
    tdElemArr[1].classList.add("email");
    var edit = tdElemArr[2].append(["a"]);
    edit.appendChild(document.createTextNode("edit"));
    main.setAttribute(edit, ["href", "#", "onclick", "main.edit(this.parentNode.parentNode)"]);
    tdElemArr[2].appendChild(document.createTextNode(" / "));
    var del = tdElemArr[2].append(["a"]);
    del.appendChild(document.createTextNode("delete"));
    main.setAttribute(del, ["href", "#", "onclick", "main.del(this.parentNode.parentNode)"]);
    return newElemTr;
  },

  setAttribute: function (obj,attr) {
    "use strict";
    var length = 0;
    while(length < attr.length ) {
      obj.setAttribute(attr[length++], attr[length++]);
    }
  },

  save: function (currentElemTr) {
    "use strict";
    table.replaceChild(main.createDisplayFragment(currentElemTr), currentElemTr);
  },

  edit: function (currentElemTr) {
    "use strict";
    var newElemTr = main.createInputFragment(currentElemTr.id);
    newElemTr.getElementsByClassName("name")[0].value = currentElemTr.getElementsByClassName("name")[0].innerHTML;
    newElemTr.getElementsByClassName("email")[0].value = currentElemTr.getElementsByClassName("email")[0].innerHTML;
    table.replaceChild(newElemTr, currentElemTr);
  },

  del: function (currentElemTr) {
    "use strict";
    table.removeChild(currentElemTr);
    if(!table.getElementsByTagName("td").length) {
      var ElemP = document.getElementById("container").append(["p"]);
      ElemP.innerHTML = "There are no records in this table. Please click on below button to add new record.";
      ElemP.id = "noData";
    }
  }
}

Object.prototype.append = function (elem) {
  "use strict";
  var length = 1, appendedElements = [], that = this;
  if (elem.length == 1) {
    return that.appendChild(document.createElement(elem[0]));
  } else {
    while (elem[0] == "nested" && length < elem.length) {
      that = that.appendChild(document.createElement(elem[length++]));
      appendedElements.push(that);
    }
    while (elem[0] == "sibling" && length < elem.length) {
      appendedElements.push(that.appendChild(document.createElement(elem[length++])));
    }
    return appendedElements;
  }
};