var nameJSON = [{"name":"Luigi Damiano"},
{"name":"Zenith Coboro"},
{"name":"Zig Ziglar"},
{"name":"Steve Costner"},
{"name":"Bill Grazer"},
{"name":"Timothy Frazer"},
{"name":"Boris Becker"},
{"name":"Glenn Gladwich"},
{"name":"Jim Jackson"},
{"name":"Aaron Kabin"},
{"name":"Roy Goldwin"},
{"name":"Jason Goldberg"},
{"name":"Tim Ferris"},
{"name":"Buck Singham"},
{"name":"Malcom Gladwell"},
{"name":"Joy Rabura"},
{"name":"Vid Luther"},
{"name":"Tom Glicken"},
{"name":"Ray Baxter"},
{"name":"Ari Kama"},
{"name":"Kenichi Suzuki"},
{"name":"Rick Olson"}]

//NEED TO DISCUSS THIS ISSUE WITH TUTU. Below code works in firefox but not in chrome why??
// var name = document.getElementById("name"); name.addEventListener();
//var name = document.getElementById("name");
document.getElementById("name").addEventListener("keyup", function() {
  var keyword = new RegExp(this.value.toLowerCase()), results = [], length = nameJSON.length;
  for(i=0;i<length;i++) {
    if(keyword.test(nameJSON[i].name.toLowerCase())) {
      results.push(nameJSON[i].name)
    }
  }
  if (selectbox = document.getElementsByClassName("result")[0]) { selectbox.parentNode.removeChild(selectbox)}
  if (results.length && this.value) displayResults(results);
});

function createSelectBox() {
  var fragment = document.createDocumentFragment();
  var selectBox = fragment.appendChild(document.createElement("select"));
  selectBox.classList.add("result");
  selectBox.size = 8;
  return selectBox;
}

function displayResults(results) {
  selectBox = createSelectBox();
  for(i=0;i<results.length;i++) {
    var optionElem = selectBox.appendChild(document.createElement('option'));
    optionElem.value = results[i];
    optionElem.addEventListener("click", function() { 
      document.getElementById("name").value = this.value;
      selectBox.parentNode.removeChild(selectBox);
    })
    optionElem.appendChild(document.createTextNode(results[i]));
  }
  document.getElementById("results").appendChild(selectBox);
}