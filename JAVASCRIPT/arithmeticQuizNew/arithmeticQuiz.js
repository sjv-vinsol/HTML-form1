var operator = ["+", "*", "-", "/"], questionNumber = 0;

document.getElementById("start").addEventListener("click", function () {
  var startButton = document.getElementById("start");
  startButton.parentNode.removeChild(startButton);
  quiz = new Quiz();
  quiz.start();
});

function Question() {
  //generate two random numbers less than 20
  var getTwoRandomNumbers = function () {
    return ([Math.floor(Math.random() * 10 + Math.random() * 10 + 1), Math.floor(Math.random() * 10 + Math.random() * 10 + 1)]);
  }

  // get operator of -, +, *, /
  var getOperator = function() {
    return operator[Math.floor(Math.random() * operator.length)];
  }

  var generateQuestionString = function () {
    var number = getTwoRandomNumbers();
    var operator = getOperator();
    return (number[0] + " " + operator + " " + number[1]);
  }

  this.questionNumber = ++questionNumber;
  this.questionString = generateQuestionString();
  this.correctAnswer = Math.round(eval(this.questionString) * 100) / 100;
  this.userAnswer = "";
  this.isTimeOut = false;
  this.wrongAns = false;

  this.addToQuestionJSON = function () {
    questionJSON[this.questionNumber] = this;
  };
}

function Quiz() {
  this.timerForEachQuestion = 20;
  this.score = 0;
  this.questions = [];
  this.currentQuestion = {};
  this.maxNoOfQuestions = 20;
  this.generateQuestions = function () {
    var length = this.maxNoOfQuestions, questionArray = [];
    for (i = 0; i < length; i++) {
      questionArray.push(new Question());
    }
    return questionArray
  };

  var removeAllInnerNodesFrom = function (myNode) {
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
  };

  var changeFontColorToRed = function (elem) {
    elem.classList.add("redColor");
  };

  var startTimer = function (quiz) {
    var timerCounter = quiz.timerForEachQuestion;
    var counterElem = document.getElementById("countDown");
    removeAllInnerNodesFrom(counterElem);
    counterElem.appendChild(document.createTextNode(timerCounter));
    function decrementCounterEverySec() {
      if (timerCounter < 7) { changeFontColorToRed(counterElem) };
      if (timerCounter > 0) { counterElem.innerHTML = --timerCounter }
      else {
        quiz.currentQuestion.isTimeOut = true;
        document.getElementById("submit").click();
      }
    }
    timerHandle = setInterval(decrementCounterEverySec, 1000);
  };

  this.start = function() {
    var index = 0;
    this.questions = this.generateQuestions();
    this.currentQuestion = this.questions[index];
    appendSubmitButton();
    displayCurrentScore(this);
    // var timerCounter = this.timerForEachQuestion;
    startTimer(this);
    displayQuestion(this);
    addEventHandlerToSubmitButton(this, index);
  };  

  var displayNonCorrectAns = function(quiz) {
    var length = Object.keys(quiz.questions).length, nonCorrectAnsArray = [], question = {};
    for (i = 0; i < length; i++) {
      question = quiz.questions[i];
      if (question.isTimeOut || question.wrongAns) {
        nonCorrectAnsArray.push(question.questionNumber + ") " + question.questionString + " = " + question.correctAnswer);
      }
    }
    removeAllInnerNodesFrom(document.getElementById("wrongAns"));
    if (nonCorrectAnsArray.length) { document.getElementById("wrongAns").appendChild(document.createTextNode(nonCorrectAnsArray.join(", "))) }
    else { document.getElementById("wrongAns").appendChild(document.createTextNode("Congratulations!! you have answered all answers correctly"))};
  };

  var quizFinish = function (quiz) {
    clearInterval(timerHandle);
    document.getElementById('submit').parentNode.removeChild(document.getElementById('submit'));
    removeAllInnerNodesFrom(document.getElementById("questionContainer"));
    removeAllInnerNodesFrom(document.getElementById("countDown"));
    removeAllInnerNodesFrom(document.getElementById('score'));
    document.getElementById('score').appendChild(document.createTextNode("Final Score = " + quiz.score));
    displayNonCorrectAns(quiz);
    appendStartAgain();
  };

  var appendSubmitButton = function() {
    var submitButton = document.getElementById("container").appendChild(document.createElement("input"));
    submitButton.type = "button";
    submitButton.value = "Submit";
    submitButton.id = "submit";
  };

  var displayQuestion = function (quiz) {
    removeAllInnerNodesFrom(document.getElementById("questionContainer"));
    var questionContainer = document.getElementById("questionContainer");
    questionContainer.innerHTML = "Q." + (quiz.currentQuestion.questionNumber) + ") &nbsp&nbsp&nbsp&nbsp" + quiz.currentQuestion.questionString + " " + " " + "&nbsp&nbsp=&nbsp&nbsp";
    var textElem = questionContainer.appendChild(document.createElement("input"));
    textElem.id = "answer";
  };

  function addEventHandlerToSubmitButton(quiz, index) {
    document.getElementById("submit").addEventListener("click", function () {
      if (!quiz.currentQuestion.isTimeOut && checkResult(quiz.currentQuestion)) {
        quiz.score = quiz.score + 1;
        displayCurrentScore(quiz);
      }
      if (quiz.currentQuestion.questionNumber < quiz.maxNoOfQuestions) {
        document.getElementById("countDown").classList.remove("redColor");
        clearInterval(timerHandle);
        quiz.currentQuestion = quiz.questions[++index];
        // timerCounter = 20;
        startTimer(quiz);
        displayQuestion(quiz);
      } else {
        quizFinish(quiz);
      }
    });
  };

  var appendStartAgain = function () {
    var startButton = document.getElementById("startAgain").appendChild(document.createElement("input"));
    startButton.type = "button";
    startButton.value = "Start Again";
    startButton.id = "startAgain";
    startButton.addEventListener("click", function() {
      questionNumber = 0;
      removeAllInnerNodesFrom(document.getElementById("startAgain"));
      removeAllInnerNodesFrom(document.getElementById("wrongAns"));
      quiz = new Quiz();
      quiz.start();
    })
  };

  var checkResult = function(question) {
    question.userAnswer = document.getElementById("answer").value;
    if (question.userAnswer == question.correctAnswer && question.userAnswer) { return true; }
    else { question.wrongAns = true; return false; }
  };

  var displayCurrentScore = function (quiz) {
    removeAllInnerNodesFrom(document.getElementById('score'));
    document.getElementById('score').appendChild(document.createTextNode("Score = " + quiz.score));
  };
};