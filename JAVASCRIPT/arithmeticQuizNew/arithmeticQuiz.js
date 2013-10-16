var operator = ["+", "*", "-", "/"], score = 0, timerCounter = 20, questionNumber = 0;
var questionJSON = {}, question = {};

document.getElementById("start").addEventListener("click", function () {
  question = new Question();
  question.display();
  startTimer();
  appendSubmitButton();
  addEventHandlerToSubmitButton();
  displayCurrentScore();
  var startButton = document.getElementById("start");
  startButton.parentNode.removeChild(startButton);
});

function Question() {
  this.questionNumber = ++questionNumber;
  this.questionString = generateQuestionString();
  this.correctAnswer = Math.round(eval(this.questionString) * 100) / 100;
  this.userAnswer = "";
  this.isTimeOut = false;
  this.wrongAns = false;

  this.addToQuestionJSON = function () {
    questionJSON[this.questionNumber] = this;
  };

  this.display = function () {
    removeAllInnerNodesFrom(document.getElementById("questionContainer"));
    var questionContainer = document.getElementById("questionContainer");
    questionContainer.innerHTML = "Q." + (questionNumber) + ") &nbsp&nbsp&nbsp&nbsp" + this.questionString + " " + " " + "&nbsp&nbsp=&nbsp&nbsp";
    var textElem = questionContainer.appendChild(document.createElement("input"));
    textElem.id = "answer";
  };
}

function generateQuestionString() {
  var number = getTwoRandomNumbers();
  var operator = getOperator();
  return (number[0] + " " + operator + " " + number[1]);
}

function changeFontColorToRed(elem) {
  elem.classList.add("redColor");
}

function startTimer() {
  var counterElem = document.getElementById("countDown");
  removeAllInnerNodesFrom(counterElem);
  counterElem.appendChild(document.createTextNode(timerCounter));
  function decrementCounterEverySec() {
    if (timerCounter < 7) { changeFontColorToRed(counterElem) };
    if (timerCounter > 0) { counterElem.innerHTML = --timerCounter }
    else {
      question.isTimeOut = true;
      document.getElementById("submit").click();
    }
  }
  timerHandle = setInterval(decrementCounterEverySec, 1000);
}

// get operator of -, +, *, /
function getOperator() {
  return operator[Math.floor(Math.random() * operator.length)];
}

//generate two random numbers less than 20
function getTwoRandomNumbers() {
  return ([Math.floor(Math.random() * 10 + Math.random() * 10 + 1), Math.floor(Math.random() * 10 + Math.random() * 10 + 1)]);
}

function appendSubmitButton() {
  var submitButton = document.getElementById("container").appendChild(document.createElement("input"));
  submitButton.type = "button";
  submitButton.value = "Submit";
  submitButton.id = "submit";
}

function addEventHandlerToSubmitButton() {
  document.getElementById("submit").addEventListener("click", function () {
    if (!question.isTimeOut && checkResult()) {
      score = score + 1;
      displayCurrentScore();
    }
    if (questionNumber < 20) {
      document.getElementById("countDown").classList.remove("redColor");
      clearInterval(timerHandle);
      timerCounter = 20;
      startTimer();
      question.addToQuestionJSON();
      question = new Question();
      question.display();
    } else {
      question.addToQuestionJSON();
      quizFinish();
    }
  });
}

function checkResult() {
  question.userAnswer = document.getElementById("answer").value;
  if (question.userAnswer == question.correctAnswer && question.userAnswer) { return true; }
  else { question.wrongAns = true; return false; }
}

function quizFinish() {
  clearInterval(timerHandle);
  document.getElementById('submit').parentNode.removeChild(document.getElementById('submit'));
  document.getElementById("questionContainer").parentNode.removeChild(document.getElementById("questionContainer"));
  document.getElementById("countDown").parentNode.removeChild(document.getElementById("countDown"));
  removeAllInnerNodesFrom(document.getElementById('score'));
  document.getElementById('score').appendChild(document.createTextNode("Final Score = " + score));
  displayNonCorrectAns();
  appendStartAgain();
}

function displayNonCorrectAns() {
  var length = Object.keys(questionJSON).length, nonCorrectAnsArray = [];
  for (i = 1; i <= length; i++) {
    question = questionJSON[i];
    if (question.isTimeOut || question.wrongAns) {
      nonCorrectAnsArray.push(question.questionNumber + ") " + question.questionString + " = " + question.correctAnswer);
    }
  }
  removeAllInnerNodesFrom(document.getElementById("wrongAns"));
  if (nonCorrectAnsArray.length) { document.getElementById("wrongAns").appendChild(document.createTextNode(nonCorrectAnsArray.join(", "))) }
  else { document.getElementById("wrongAns").appendChild(document.createTextNode("Congratulations!! you have answered all answers correctly"))};
}

function appendStartAgain() {
  var startButton = document.getElementById("startAgain").appendChild(document.createElement("input"));
  startButton.type = "button";
  startButton.value = "Start Again";
  startButton.id = "startAgain";
  startButton.addEventListener("click", function() {
    location.reload(true);
  })
}

function displayCurrentScore() {
  removeAllInnerNodesFrom(document.getElementById('score'));
  document.getElementById('score').appendChild(document.createTextNode("Score = " + score));
}

function removeAllInnerNodesFrom(myNode) {
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}