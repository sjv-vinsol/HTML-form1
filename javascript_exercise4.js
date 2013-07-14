// variable name is same as the Id of the main checkbox
var color = ["red", "yellow", "green", "blue"];
var movies = ["dar", "sir"];
var drinks = ["coke", "pepsi", "dew"];
var bikes = ["v-rod", "pulsar", "cbz"];

function showOrRemoveList(that) {
  var that = that.parentNode;
  if (that.getElementsByTagName("input")[0].checked == true) {
    if (!that.getElementsByTagName("div").length) {      
      appendInnerCheckbox(that);
    }
    status("check", that);
    that.parentNode.scrollTop = that.offsetTop;        
  } else {
    status("uncheck", that);
    that.removeChild(that.getElementsByTagName("div")[0]);
  }   
}

function appendInnerCheckbox(that) {
  var len = 0;
  var fragment = document.createDocumentFragment();
  var elemDiv = fragment.appendChild(document.createElement("div"));  
  setAttribute(elemDiv, ["class", "innerCheckbox"])
  var valueArr = getValueOfInnerContainers(that);
  while (len < valueArr.length) { 
    var input = elemDiv.appendChild(document.createElement("input"));
    var attr = ["type", "checkbox", "onclick", "confirmAllCheckbox(this)","value", valueArr[len]];    
    setAttribute(input, attr);
    elemDiv.appendChild(document.createTextNode(valueArr[len++].toUpperCase()));
    elemDiv.appendChild(document.createElement("br"));
  }
  that.appendChild(elemDiv);
}

function confirmAllCheckbox(that) {
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
}

function setAttribute(obj, attr) {
  var length = 0;
  while(length < attr.length ) {
    obj.setAttribute(attr[length++], attr[length++]);
  }
}

function getValueOfInnerContainers(that) {
  switch(parseInt(that.id, 10)) {
    case 1: {
      return color;
    }
    break;
    case 2: {      
      return movies;
    }
    break;
    case 3: {
      return drinks;
    }
    break;
    case 4: {
      return bikes;
    }
    break;
  }
}

function status(state, parent) {
  var value = (state == "check") ? true : false;
  var elem = parent.getElementsByTagName("div")[0].getElementsByTagName("input");  
  var len = elem.length;
  while (len) {    
    elem[--len].checked = value;
  }
}