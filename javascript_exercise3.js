var main =  {
  id: 1,
  table: document.getElementById("table"),
  addNewRow: function () {
    var newElemTr = main.createInputFragment();
    if (!table.getElementsByTagName("td").length) {
      document.getElementById("container").removeChild(document.getElementById("noData"));
    }
    table.appendChild(newElemTr);
  },

  createInputFragment: function (currentElemId) {
    // Create Fragment for input field
    var newFrgment = document.createDocumentFragment(), newElemTr = newFrgment.append("tr");    
    //Maintaining the existing Id of the tr tag
    var newId = (currentElemId) ? currentElemId : main.id++;
    newElemTr.setAttribute("id", ""+newId+"");    
    // Creting td thg that is sibling of tr tag.
    var tdElemArr = newElemTr.append("sibling td td td"), name = tdElemArr[0].append("input");
    var attr = ["type", "text", "placeholder", "Type Name Here", "class", "name"];
    main.setAttribute(name,attr);
    //appending input tag email to td
    var email = tdElemArr[1].append("input");
    attr = ["type", "email", "placeholder", "Email Address", "class", "email"];
    main.setAttribute(email, attr);
    //appending input tag to td
    var save = tdElemArr[2].append("input");
    attr = ["type", "button", "value", "save", "id", "save", "onclick", "main.save(this)"];
    main.setAttribute(save, attr);
    return newElemTr;
  },

  createDisplayFragment: function (save, currentElemTr) {
    var value = main.getNameAndEmail(currentElemTr);  
    // Create fragment to display data of text field on clicking save button.
    var newFrgment = document.createDocumentFragment(), newElemTr = newFrgment.append("tr");
    newElemTr.setAttribute("id", currentElemTr.id);
    // Creting td thg that is sibling of tr tag.
    var tdElemArr = newElemTr.append("sibling td td td");  
    tdElemArr[0].innerHTML = value[0];
    tdElemArr[0].setAttribute("class", "name");  
    tdElemArr[1].innerHTML = value[1];
    tdElemArr[1].setAttribute("class", "email");
    var edit = tdElemArr[2].append("a");
    edit.innerHTML = "edit";
    var attr = ["href", "#", "onclick", "main.edit(this)"];
    main.setAttribute(edit, attr);
    tdElemArr[2].appendChild(document.createTextNode(" / "));
    var del = tdElemArr[2].append("a");
    del.innerHTML = "delete";
    attr = ["href", "#", "onclick", "main.del(this)"];
    main.setAttribute(del, attr);
    return newElemTr;
  },

  getNameAndEmail: function (currentElemTr) {
    var name_value = currentElemTr.getElementsByClassName("name")[0].value;
    var email_value = currentElemTr.getElementsByClassName("email")[0].value;
    return [name_value, email_value];
  },

  setAttribute: function (obj,attr) {
    var length = 0;
    while(length < attr.length ) {
      obj.setAttribute(attr[length++], attr[length++]);
    }
  },

  save: function (save) {
    var currentElemTr = save.parentNode.parentNode;
    var newElemTr = main.createDisplayFragment(save, currentElemTr);
    //Replace element 
    table.replaceChild(newElemTr, currentElemTr);
  },

  edit: function (edit) {
    var currentElemTr = edit.parentNode.parentNode;
    var newElemTr = main.createInputFragment(currentElemTr.id);
    var name = currentElemTr.getElementsByClassName("name")[0].innerHTML;
    var email = currentElemTr.getElementsByClassName("email")[0].innerHTML;
    newElemTr.getElementsByClassName("name")[0].value = name;
    newElemTr.getElementsByClassName("email")[0].value = email;
    //Replace element
    table.replaceChild(newElemTr, currentElemTr);
  },

  del: function (delet) {
    var currentElemTr = delet.parentNode.parentNode;
    table.removeChild(currentElemTr);
    if(!table.getElementsByTagName("td").length) {
      var ElemP = document.getElementById("container").append('p');
      ElemP.innerHTML = "There are no records in this table. Please click on below button to add new record.";
      ElemP.id = "noData";
    }
  }
}

Object.prototype.append = function (elem) {
  var elem = elem.split(" ");
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
