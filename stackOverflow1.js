
function addHandler(element, type, handler) {
  alert("Hi");
  if(element.addEventListener) {
    alert("1");
    element.addEventListener(type, handler, false);
  } else if(element.attachEvent) {
    alert("2");
    element.attachEvent("on"+type, handler)
  } else { 
    alert("3");
    element["on"+type] = handler };
}
addHandler(window, "load", main)

function main() {
  function handler() {
    var selectElem = document.getElementById("color");
    document.getElementById("red").style.display = "none";
    document.getElementById("blue").style.display = "none";
    document.getElementById(selectElem.value).style.display = "block";
  }
  addHandler(document.getElementById("color"), "change", handler);
}