var operator = ["+", "*", "-", "/"];

document.getElementById("start").addEventListener("click", function () {
  var startButton = document.getElementById("start");
  startButton.parentNode.removeChild(startButton);
  quiz = new Quiz();
  quiz.start();
});

function Question(questionNumber) {
  this.randomNumerRange = [1, 20];     // To set the random number of a question.
  // Generate two random numbers between specified in random numberNumberRange.
  this.getTwoRandomNumbersBetween = function () {
    var numberArr = [], min = this.randomNumerRange[0], max = this.randomNumerRange[1];
    while (numberArr.length < 2) {
      numberArr.push(Math.round(Math.random() * (max - min)) + min);
    }
    return numberArr;
  }

  // get operator of -, +, *, /
  var getOperator = function() {
    return operator[Math.floor(Math.random() * operator.length)];
  }

  this.generateQuestionString = function () {
    var number = this.getTwoRandomNumbersBetween();
    var operator = getOperator();
    return (number[0] + " " + operator + " " + number[1]);
  }
  
  this.questionNumber = ++questionNumber;
  console.log(this.questionNumber);
  this.questionString = this.generateQuestionString();
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
      questionArray.push(new Question(i));
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
    quiz.timerHandle = setInterval(decrementCounterEverySec, 1000);
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
    clearInterval(quiz.timerHandle);
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
    console.log(quiz.currentQuestion.questionNumber);
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
        clearInterval(quiz.timerHandle);
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
      // questionNumber = 0;
      removeAllInnerNodesFrom(document.getElementById("startAgain"));
      removeAllInnerNodesFrom(document.getElementById("wrongAns"));
      var quiz = new Quiz();
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