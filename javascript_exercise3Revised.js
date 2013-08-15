window.addEventListener("load", function() {
  var table = document.getElementById("table");
  var noRecordElem = document.getElementById('noData').cloneNode(true);
  document.getElementById("add").addEventListener("click", function() {
    var noRecordMsgElem = document.getElementById("noData")
    if (noRecordMsgElem) noRecordMsgElem.parentNode.removeChild(noRecordMsgElem)
    var trElem = createOrEditRow();
  })

  function createOrEditRow(that) {
    var trElem = document.getElementById("takeInput").cloneNode(true);
    if (that) {
      var elem = that.parentNode.parentNode
      var json = createJSONOfNameEmail(trElem);
      var tdElem = elem.getElementsByTagName('td');
      json.name.value = tdElem[0].innerHTML;
      json.email.value = tdElem[1].innerHTML;
      elem.parentNode.replaceChild(trElem, elem);
    }else {
      table.appendChild(trElem);
    }
    trElem.getElementsByClassName("button")[0].addEventListener("click", function() { displayRow(trElem); })
  }

  function displayRow(elem) {
    var trElem = document.getElementById("displayInput").cloneNode(true);
    var json = createJSONOfNameEmail(elem);
    var tdElem = trElem.getElementsByTagName("td");
    tdElem[0].innerHTML = json.name.value;
    tdElem[1].innerHTML = json.email.value;
    tdElem[2].getElementsByClassName("edit")[0].addEventListener("click", function() { createOrEditRow(this) });
    tdElem[2].getElementsByClassName("delete")[0].addEventListener("click", function() { remove(this) });
    elem.parentNode.replaceChild(trElem, elem);
  }

  function createJSONOfNameEmail(elem) {
    return ({name: elem.getElementsByClassName('name')[0], email: elem.getElementsByClassName('email')[0]});
  }

  function remove(that) {
    table.removeChild(that.parentNode.parentNode);
    if (!table.getElementsByTagName('td').length) { table.parentNode.appendChild(noRecordElem)}
  }
})