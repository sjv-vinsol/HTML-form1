var noOfImageBoxes = 36, delayForNoMatch = 300;
window.addEventListener("load", function () {
  // arguments to game specifies noOfImageBoxes, delayForNoMatch
  // noOfImageBoxes can be maximum 36 as there are only 18 images in JSON.
  var game = new Game(noOfImageBoxes, delayForNoMatch);
  game.init();
})

// var imageJSON = [ {url: "image_0.jpg"}, {url: "image_1.jpg"}, {url: "image_2.jpg"}, {url: "image_3.jpg"}, {url: "image_4.jpg"}, {url: "image_5.jpg"}, {url: "image_6.jpg"}, {url: "image_7.jpg"}, {url: "image_8.jpg"}, {url: "image_9.jpg"}, {url: "image_10.jpg"}, {url: "image_11.jpg"}, {url: "image_12.jpg"}, {url: "image_13.jpg"}, {url: "image_14.jpg"}, {url: "image_15.jpg"}, {url: "image_16.jpg"}, {url: "image_17.jpg"}, {url: "image_0.jpg"}, {url: "image_1.jpg"}, {url: "image_2.jpg"}, {url: "image_3.jpg"}, {url: "image_4.jpg"}, {url: "image_5.jpg"}, {url: "image_6.jpg"}, {url: "image_7.jpg"}, {url: "image_8.jpg"}, {url: "image_9.jpg"}, {url: "image_10.jpg"}, {url: "image_11.jpg"}, {url: "image_12.jpg"}, {url: "image_13.jpg"}, {url: "image_14.jpg"}, {url: "image_15.jpg"}, {url: "image_16.jpg"}, {url: "image_17.jpg"}];

function Game(noOfImageBox, delayForNoMatch) {
  var count = 0;
  this.delayForNoMatch = delayForNoMatch;
  this.isDelayForNoMatch = false;
  this.noOfImageBox = noOfImageBox;
  this.totalCount = 0;

  this.getImages = function () {
    var gameImageJSON = this.imageJSON.slice(0, (noOfImageBox/2));
    var length = gameImageJSON.length;
    while (length--) {
      gameImageJSON.push(gameImageJSON[length]);
    }
    this.images = gameImageJSON;
  }

  this.init = function () {
    this.addEventToStartButton();
    this.getImages();
  }

  this.addImagesToImageBox = function (imgElem, i) {
    imgElem.src = "images/" + this.images[i].url;
    imgElem.classList.add("image");
    imgElem.classList.add("hidden");
  }

  this.generateRandomNoBelow = function (value) {
    return Math.floor(Math.random() * value);
  }

  this.shuffleImages = function () {
    var length = this.images.length, randomIndex = 0;
    while(--length) {
      randomIndex = this.generateRandomNoBelow(this.noOfImageBox);
      temp = this.images[randomIndex];
      this.images[randomIndex] = this.images[length];
      this.images[length] = temp;
    }
  }

  this.bindEventOnImageClick = function (div) {
    div.addEventListener("click", function(event) {
      this.onImageClick(event);
    }.bind(this));
  }

  this.appendImageToContainer = function (div, count) {
    div.classList.add("imageBox");
    var imgElem = div.appendChild(document.createElement("img"));
    this.addImagesToImageBox(imgElem, count);
    this.bindEventOnImageClick(div);
  }

  this.showImageContainer = function (fragment) {
    document.getElementById("grid").appendChild(fragment);
  }

  this.appendImagesToContainer = function() {
    var imgElem = "", div = "";
    fragment = document.createDocumentFragment();
    for (var i = 0; i < this.noOfImageBox; i++) {
      div = fragment.appendChild(document.createElement("div"));
      this.appendImageToContainer(div, i);
    }
    this.showImageContainer(fragment);
  }

  this.startTimer = function () {
    var timerCount = 0;
    this.timerHandler = setInterval(function() {
      timerCount++;
      document.getElementById("timer").innerHTML = "Time Elapsed : &nbsp&nbsp" + timerCount;
    }, 1000);
  }

  this.imageIsHidden = function (event) {
    if (event.target.tagName != "IMG") return true
      else return false;
  }

  this.hideBothImages = function () {
    this.isDelayForNoMatch = true;
    setTimeout(function() {
      this.previousImg.classList.add("hidden");
      this.currentImg.classList.add("hidden");
      this.isDelayForNoMatch = false;
    }.bind(this), this.delayForNoMatch);
  }

  this.showClickedImage = function (event) {
    this.currentClickedElem = event.currentTarget;
    this.currentImg = this.currentClickedElem.getElementsByTagName("img")[0];
    this.currentImg.classList.remove("hidden");
  }

  this.onImageClick = function (event) {
    if (this.imageIsHidden(event) && !this.isDelayForNoMatch) {
      this.showClickedImage(event);
      if (++count == 1) this.previousImg = this.currentImg;
      else if (count == 2) {
        if (this.currentImg.src == this.previousImg.src) {
          this.totalCount += 2;
        }
        else {
          this.hideBothImages();
        }
        count = 0;
      }
    }
    if(this.gameFinish())  {
      clearInterval(this.timerHandler);
      document.getElementById("playAgain").classList.add('highlight');
    }
  }

  this.gameFinish = function () {
    if (this.totalCount == this.noOfImageBox) return true;
    else return false
  }

  this.addEventToStartButton = function () {
    var startBtn = document.getElementById("start");
    startBtn.addEventListener("click", function() {
      startBtn.classList.add('hidden');
      this.startNewGame(true);
    }.bind(this))
  }

  this.startNewGame = function () {
    this.shuffleImages();
    this.startTimer();
    this.appendImagesToContainer();
    this.displayImagesContainer();
    this.appendPlayAgainButton();
    this.bindEventToPlayAgain();
  }

  this.appendPlayAgainButton = function () {
    var elem = document.createElement("input");
    this.setAttributes(elem, {type: "button", value: "Play Again", id: "playAgain"});
    document.getElementById("playAgainContainer").appendChild(elem);
  }

  function emptyGrid(elem) {
    while (elem.firstChild) {
      elem.removeChild(elem.firstChild);
    }
  }

  function playAgainHandler() {
    if (confirm("Are you sure want to play again")) {
      clearInterval(this.timerHandler);
      emptyGrid(document.getElementById('grid'));
      this.removePlayAgain();
      var game = new Game(noOfImageBox, delayForNoMatch);
      game.getImages();
      game.startNewGame(false);
    }
  }

  this.bindEventToPlayAgain = function () {
    document.getElementById("playAgain").addEventListener("click", playAgainHandler.bind(this));
  }

  this.displayImagesContainer = function () {
    document.getElementById('gameContainer').classList.remove('hidden');
  }

  this.removePlayAgain = function () {
    var playAgain = document.getElementById("playAgain");
    playAgain.parentNode.removeChild(playAgain);
  }
}

Game.prototype = {
  setAttributes: function (elem, attrs) {
    for (var key in attrs) {
      elem.setAttribute(key, attrs[key]);
    }
  },
  imageJSON: [{url: "image_0.jpg"}, {url: "image_1.jpg"}, {url: "image_2.jpg"}, {url: "image_3.jpg"}, {url: "image_4.jpg"}, {url: "image_5.jpg"}, {url: "image_6.jpg"}, {url: "image_7.jpg"}, {url: "image_8.jpg"}, {url: "image_9.jpg"}, {url: "image_10.jpg"}, {url: "image_11.jpg"}, {url: "image_12.jpg"}, {url: "image_13.jpg"}, {url: "image_14.jpg"}, {url: "image_15.jpg"}, {url: "image_16.jpg"}, {url: "image_17.jpg"}]
}