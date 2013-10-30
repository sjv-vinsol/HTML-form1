var imageJSON = [ {url: "image_0.jpg"}, {url: "image_1.jpg"}, {url: "image_2.jpg"}, {url: "image_3.jpg"}, {url: "image_4.jpg"}, {url: "image_5.jpg"}, {url: "image_6.jpg"}, {url: "image_7.jpg"}, {url: "image_8.jpg"}, {url: "image_9.jpg"}, {url: "image_10.jpg"}, {url: "image_11.jpg"}, {url: "image_12.jpg"}, {url: "image_13.jpg"}, {url: "image_14.jpg"}, {url: "image_15.jpg"}, {url: "image_16.jpg"}, {url: "image_17.jpg"}, {url: "image_0.jpg"}, {url: "image_1.jpg"}, {url: "image_2.jpg"}, {url: "image_3.jpg"}, {url: "image_4.jpg"}, {url: "image_5.jpg"}, {url: "image_6.jpg"}, {url: "image_7.jpg"}, {url: "image_8.jpg"}, {url: "image_9.jpg"}, {url: "image_10.jpg"}, {url: "image_11.jpg"}, {url: "image_12.jpg"}, {url: "image_13.jpg"}, {url: "image_14.jpg"}, {url: "image_15.jpg"}, {url: "image_16.jpg"}, {url: "image_17.jpg"}];

function Game() {
  this.delayForNoMatch = 200;
  this.isDelayForNoMatch = false;
  this.imageBoxCount = 36;
  var count = 0;
  this.totalCount = 0;
  var previousClickImg = "";
  var addImagesToImageBox = function (imgElem) {
    imgElem.src = "images/" + imageJSON[i].url;
    imgElem.classList.add("image");
    imgElem.classList.add("hidden");
  }

  var generateRandomNoBelow20 = function () {
    return Math.floor(Math.random() * 10 * 2);
  }

  this.shuffleImages = function () {
    var length = imageJSON.length;
    var randomIndex = 0;
    while(--length) {
      randomIndex = generateRandomNoBelow20();
      temp = imageJSON[randomIndex];
      imageJSON[randomIndex] = imageJSON[length];
      imageJSON[length] = temp;
    }
  }

  this.start = function() {
    var game = this;
    fragment = document.createDocumentFragment();
    for (i = 0; i < this.imageBoxCount; i++) {
      div = fragment.appendChild(document.createElement("div"));
      div.classList.add("imageBox");
      imgElem = div.appendChild(document.createElement("img"));
      addImagesToImageBox(imgElem, i);
      div.addEventListener("click", function(event) {
        logicOnImageClick(event, game, this);
      })
    }
    document.getElementById("grid").appendChild(fragment);
  }

  this.startTimer = function () {
    var timerCount = 0;
    this.timerHandler = setInterval(function() {
      timerCount++;
      document.getElementById("timer").innerHTML = "Time Elapsed : &nbsp&nbsp" + timerCount;
    }, 1000);
  }

  function logicOnImageClick(event, game, currentClickedElem) {
    if (event.target.tagName != "IMG" && !game.isDelayForNoMatch) {
      // count++;
      var elemClickImg = currentClickedElem.getElementsByTagName("img")[0];
      elemClickImg.classList.remove("hidden");
      if (++count == 1) previousClickImg = currentClickedElem.getElementsByTagName("img")[0];
      else if (count == 2) {
        if (elemClickImg.src == previousClickImg.src) {
          game.totalCount += 2;
        }
        else {
          game.isDelayForNoMatch = true;
          setTimeout(function() {
            previousClickImg.classList.add("hidden");
            elemClickImg.classList.add("hidden");
            game.isDelayForNoMatch = false;
          }, game.delayForNoMatch);
        }
        count = 0;
      }
    }
    if(game.totalCount == game.imageBoxCount) {
      clearInterval(game.timerHandler);
      document.getElementById("playAgain").classList.add('redBackground');
    }
  }
}

function startNewGame() {
  game = new Game();
  game.shuffleImages();
  game.startTimer();
  game.start();
}

(function main() {
  document.getElementById("start").addEventListener("click", function() {
    document.getElementById("start").classList.add('hidden');
    document.getElementById('gameContainer').classList.remove('hidden');
    startNewGame();
  })
})();

document.getElementById("playAgain").addEventListener("click", function() {
  if (confirm("Are you sure want to play again")) {
    clearInterval(game.timerHandler);
    emptyGrid(document.getElementById('grid'));
    startNewGame();
  }
});

function emptyGrid(elem) {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
}