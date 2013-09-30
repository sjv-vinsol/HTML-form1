var imageJSON = [ {url: "car1.jpg"}, {url: "car2.jpg"}, {url: "car3.jpg"}, {url: "car4.jpg"}, {url: "car5.jpg"}, {url: "hat1.jpg"}, {url: "hat2.jpg"}, {url: "hat3.jpg"}, {url: "hat4.jpg"}, {url: "hat5.jpg"}, {url: "car1.jpg"}, {url: "car2.jpg"}, {url: "car3.jpg"}, {url: "car4.jpg"}, {url: "car5.jpg"}, {url: "hat1.jpg"}, {url: "hat2.jpg"}, {url: "hat3.jpg"}, {url: "hat4.jpg"}, {url: "hat5.jpg"}];
(function timer() {
  var timerCount = 0;
  timerHandler = setInterval(function() {
    timerCount++;
    document.getElementById("timer").innerHTML = "Time Elapsed : &nbsp&nbsp" + timerCount;
  }, 1000);
})();

document.getElementById("playAgain").addEventListener("click", function() {
  if (confirm("Are you want to play again")) location.reload();
});

(function shuffleArray() {
  var length = imageJSON.length;
  var randomIndex = 0;
  while(--length) {
    randomIndex = generateRandomNoBelow20();
    temp = imageJSON[randomIndex];
    imageJSON[randomIndex] = imageJSON[length];
    imageJSON[length] = temp;
  }
})();

(function createGrid() {
  fragment = document.createDocumentFragment();
  for (i=0;i<20;i++) {
    div = fragment.appendChild(document.createElement("div"));
    div.classList.add("imageBox");
    imgElem = div.appendChild(document.createElement("img"));
    addImagesToImageBox(imgElem, i);
    div.addEventListener("click", main);
  }
  document.getElementById("grid").appendChild(fragment);
})();

function addImagesToImageBox(imgElem) {
  imgElem.src = "images/" + imageJSON[i].url;
  imgElem.classList.add("image");
  imgElem.classList.add("hidden");
}

var count = 0;
var totalCount = 0;

function generateRandomNoBelow20() {
  return Math.floor(Math.random() * 10 * 2);
}
var previousClickImg = "";

function main(event) {
  console.log(event.target);
  if (event.target.tagName != "img") {
    count++;
    var elemClickImg = this.getElementsByTagName("img")[0];
    elemClickImg.classList.remove("hidden");
    if (count == 1) previousClickImg = this.getElementsByTagName("img")[0];
    else if (count == 2) {
      if (elemClickImg.src == previousClickImg.src) {
        totalCount += 2;
      }
      else {
        setTimeout(function() {
          previousClickImg.classList.add("hidden"); 
          elemClickImg.classList.add("hidden");
        }, 200);
      }
      count = 0;
    }
  }
  if(totalCount == 20) { 
    clearInterval(timerHandler);
    document.getElementById("playAgain").value = "Restart";
  }
}