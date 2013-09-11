var nameJSON = [{"name": "Luigi Damiano"},
{"name": "Zenith Coboro"},
{"name": "Zig Ziglar"},
{"name": "Steve Costner"},
{"name": "Bill Grazer"},
{"name": "Timothy Frazer"},
{"name": "Boris Becker"},
{"name": "Glenn Gladwich"},
{"name": "Jim Jackson"},
{"name": "Aaron Kabin"},
{"name": "Roy Goldwin"},
{"name": "Jason Goldberg"},
{"name": "Tim Ferris"},
{"name": "Buck Singham"},
{"name": "Malcom Gladwell"},
{"name": "Joy Rabura"},
{"name": "Vid Luther"},
{"name": "Tom Glicken"},
{"name": "Ray Baxter"},
{"name": "Ari Kama"},
{"name": "Kenichi Suzuki"},
{"name": "Rick Olson"}];

(function displayResultsOnKeyup () {
  document.getElementById("name").addEventListener("keyup", function () {
    var keyword = new RegExp(this.value.toLowerCase()), results = [], length = nameJSON.length;
    for (i = 0; i < length; i++) {
      if (keyword.test(nameJSON[i].name.toLowerCase())) {
        results.push(nameJSON[i].name);
      }
    }
    if (resultsContainer = document.getElementById("resultsContainer")) { resultsContainer.parentNode.removeChild(resultsContainer)}
    if (results.length && this.value) displayResults(results);
  });
})();

function addEventAndRemove(resultsContainer) {
  resultsContainer.addEventListener("click", function(event) {
    document.getElementById("name").value = event.target.innerHTML;
    resultsContainer.parentNode.removeChild(resultsContainer);
  })
}

function displayResults(results) {
  var fragment = document.createDocumentFragment();
  resultsContainer = fragment.appendChild(document.createElement("div"));
  resultsContainer.id = "resultsContainer";
  for (i = 0; i < results.length; i++) {
    var elemP = resultsContainer.appendChild(document.createElement('p'));
    elemP.innerHTML = results[i];
    elemP.classList.add("name");
  }
  addEventAndRemove(resultsContainer);
  document.getElementById("autocomplete").appendChild(resultsContainer);
}

document.getElementsByTagName("body")[0].addEventListener("click", function(e) {
  if ((resultsContainer = document.getElementById("resultsContainer")) && e.target.className != "name") document.getElementById("autocomplete").removeChild(resultsContainer);
});