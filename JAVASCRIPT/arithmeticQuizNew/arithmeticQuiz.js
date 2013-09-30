var operator = ["+", "*", "-", "/"];
var questionString = "";
var score = 0;
var timerCounter = 20;
var wrongOrTimesOutAns = [];
var questionNumber = 0;
var isTimeOut = false;

function changeFontColorToRed(elem) {
  elem.classList.add("redColor");
}

function timer() {
  document.getElementById("countDown").innerHTML = timerCounter;
  function decrementCounterEverySec() {
    if (timerCounter < 7) changeFontColorToRed(document.getElementById("countDown"));
    if (timerCounter > 0) document.getElementById("countDown").innerHTML = --timerCounter
    else {
      isTimeOut = true;
      document.getElementById("submit").click();
    }
  }
  timerHandle = setInterval(decrementCounterEverySec, 1000);
}

function displayQuestion() {
  removePreviousQuestion();
  questionString = generateQuestionString();
  var questionContainer = document.getElementById("questionContainer");
  questionContainer.innerHTML = "Q." + (++questionNumber) + ") &nbsp&nbsp&nbsp&nbsp" + questionString + " " + " " + "&nbsp&nbsp=&nbsp&nbsp";
  var textElem = questionContainer.appendChild(document.createElement("input"));
  textElem.id = "answer";
}

document.getElementById("start").addEventListener("click", function () {
  document.getElementById("start").parentNode.removeChild(document.getElementById("start"));
  timer();
  displayQuestion();
  appendSubmitButtonAndAddClickEvent();
  updateAndDisplayScore();
});

// get operator of -, +, *, /
function getOperator() {
  return operator[Math.floor(Math.random() * operator.length)];
}

//generate two random numbers less than 20
function getTwoRandomNumbers() {
  return ([Math.floor(Math.random() * 10 + Math.random() * 10 + 1), Math.floor(Math.random() * 10 + Math.random() * 10 + 1)]);
}

function appendSubmitButtonAndAddClickEvent() {
  var submitButton = document.getElementById("container").appendChild(document.createElement("input"));
  submitButton.type = "button";
  submitButton.value = "submit";
  submitButton.id = "submit";
  document.getElementById("submit").addEventListener("click", function () {
    if (!isTimeOut && checkResult(questionString)) {
      score = score + 1;
      updateAndDisplayScore();
    }
    if (questionNumber < 20) {
      document.getElementById("countDown").classList.remove("redColor");
      clearInterval(timerHandle);
      timerCounter = 20;
      timer();
      isTimeOut = false;
      displayQuestion();
    }
    else quizFinish();
  })
}

function checkResult(questionString) {
  var userAnswer = document.getElementById("answer").value, correctAnswer = Math.round(eval(questionString) * 100) / 100;
  if (userAnswer == correctAnswer && document.getElementById("answer").value) return true
  else wrongOrTimesOutAns.push("Q."+ questionNumber + ")&nbsp&nbsp&nbsp" + questionString + "&nbsp&nbsp=&nbsp&nbsp" + correctAnswer);
}

function quizFinish() {
  clearInterval(timerHandle);
  document.getElementById('submit').parentNode.removeChild(document.getElementById('submit'));
  document.getElementById("questionContainer").parentNode.removeChild(document.getElementById("questionContainer"));
  document.getElementById("countDown").parentNode.removeChild(document.getElementById("countDown"));
  document.getElementById('score').innerHTML = "Final Score = "+score+"";
  if (wrongOrTimesOutAns.length) document.getElementById("wrongAns").innerHTML = wrongOrTimesOutAns.join('</br>');
  else document.getElementById("wrongAns").innerHTML = "Congratulations!! you have answered all answers correctly";
  appendStartAgain();
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

function generateQuestionString() {
  var number = getTwoRandomNumbers();
  var operator = getOperator();
  return (number[0] + " " + operator + " " + number[1]);
}

function removePreviousQuestion() {
  document.getElementById("questionContainer").innerHTML = "";
}

function updateAndDisplayScore() {
  document.getElementById('score').innerHTML = "Score = "+score+"";
}