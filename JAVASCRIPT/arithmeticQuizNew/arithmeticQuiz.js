window.addEventListener("load", function () {
  // Arguments to Quiz(NoOfQuestion, time, rangeOfRandomVariables)
  var quiz = new Quiz(20, 5, [1, 20]);
  quiz.init();
  quiz.start();
});

function Question(questionNumber, randomNumberRange) {
  this.randomNumberRange = randomNumberRange;
  // Generate random number between digits specified in random numberNumberRange.
  this.generateRandomNumber = function () {
    var min = this.randomNumberRange[0], max = this.randomNumberRange[1];
    return (Math.round(Math.random() * (max - min)) + min);
  }

  // get operator of -, +, *, /
  this.getOperator = function() {
    return this.operators[Math.floor(Math.random() * this.operators.length)];
  }

  this.generateQuestionString = function () {
    this.operand1 = this.generateRandomNumber();
    this.operand2 = this.generateRandomNumber();
    this.operator = this.getOperator();
    return ("Q." + this.questionNumber + ") " + this.operand1 + " " + this.operator + " " + this.operand2);
  }

  this.evaluateAns = function (operatorIndex) {
    switch (operatorIndex) {
      case 0:
        return (this.operand1 * this.operand2);
      case 1:
        return Math.round((this.operand1 / this.operand2) * 100)/100;
      case 2:
        return (this.operand1 + this.operand2);
      case 3:
        return (this.operand1 - this.operand2);
    }
  }

  Question.prototype.operators = ["*", "/", "+", "-"];
  this.questionNumber = questionNumber;
  this.questionString = this.generateQuestionString();
  this.correctAnswer = this.evaluateAns(this.operators.indexOf(this.operator));
  this.userAnswer = "";
  this.isTimeOut = false;
}

function Quiz(noOfQuestions, timeForEachQuestion, randomNumberRange) {

  this.noOfQuestions = noOfQuestions;
  this.timeForEachQuestion = timeForEachQuestion;
  this.questions = {};
  this.currentQuestion = {};
  this.score = 0;
  this.nonCorrectAnsArray = [];
  this.timerCount = timeForEachQuestion;

  this.init = function () {
    this.generateQuestions();
  };

  this.generateQuestions = function () {
    var noOfQuestions = this.noOfQuestions;
    for (var questionNumber = 1; questionNumber <= noOfQuestions; questionNumber++) {
      var question = new Question(questionNumber, randomNumberRange);
      this.questions[questionNumber] = question;
    }
  };

  this.hideStartButton = function (startButton) {
    startButton.classList.add("hidden");
  }

  this.checkResult = function () {
    this.currentQuestion.userAnswer = document.getElementById("answerInput").value;
    if (this.currentQuestion.correctAnswer != parseInt(this.currentQuestion.userAnswer, 10)) {
      this.nonCorrectAnsArray.push(this.currentQuestion);
    }
  }

  this.displayQuestionSection = function () {
    document.getElementById("questionSection").classList.remove("hidden");
  }

  this.clearAnsInputField = function () {
    document.getElementById("answerInput").value = "";
  }

  this.timerHandler = function (counterElem){
    if ((--this.timerCount) == 0) {
      this.currentQuestion.isTimeOut = true;
      this.currentQuestion.userAnswer = "Time Out"
      this.nonCorrectAnsArray.push(this.currentQuestion);
      this.displayNextQuestion();
    }
    counterElem.innerHTML = this.timerCount;
  }

  this.startTimer = function () {
    var counterElem = document.getElementById("countDown");
    this.timerCount = this.timeForEachQuestion;
    counterElem.innerHTML = this.timerCount;
    timer = setInterval( function () {
      this.timerHandler(counterElem);
    }.bind(this), 1000);
  }

  this.displayNextQuestion = function () {
    document.getElementById("next").click();
  }

  this.displayFirstQuestion = function () {
    this.displayQuestionSection();
    this.currentQuestion = this.questions[1];
    this.nextBtn = document.getElementById("next");
    this.displayQuestion();
    this.startTimer();
    this.displayScore();
  }

  this.displayScore = function () {
    document.getElementById("score").classList.remove("hidden");
  }

  this.focusOnUserInput = function () {
    document.getElementById("answerInput").focus();
  }

  function handlerForNext() {
    this.focusOnUserInput();
    clearInterval(timer);
    if (!this.currentQuestion.isTimeOut) {
      this.checkResult();
      this.updateScore();
    }
    if (this.currentQuestion.questionNumber == this.noOfQuestions) {
      this.finish();
    } else {
      this.clearAnsInputField();
      this.currentQuestion = this.nextQuestion();
      this.displayQuestion();
      this.startTimer();
    }
  }

  this.hideInstructions = function () {
    document.getElementById("instructions").classList.add("hidden");
  }

  this.start = function () {
    var quiz = this;
    document.getElementById("start").addEventListener("click", function () {
      quiz.hideStartButton(this);
      quiz.hideInstructions();
      quiz.displayFirstQuestion();
      quiz.focusOnUserInput();
    })
    document.getElementById("next").addEventListener("click", handlerForNext.bind(quiz));
  };

  this.hideCurrentQuestionContainer = function () {
    document.getElementById("container").classList.add("hidden");
  }

  this.finish = function () {
    this.hideCurrentQuestionContainer();
    this.displayFinalScore();
    this.displayNonCorrectAns();
  }

  this.removeAllInnerNodesFrom = function (myNode) {
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
  }

  this.displayNonCorrectAns = function () {
    var quiz = this;
    this.appendAllNonCorrectQuestionsTo(document.getElementById("displayQuestionContainer"));
    this.displayFinalPage();
    this.addClickEventOnHomeButton();
  }

  this.addClickEventOnHomeButton = function () {
    var quiz = this;
    document.getElementById("home").addEventListener("click", function() {
      quiz.goToHomePage();
    });
  }

  this.displayFinalPage = function () {
    document.getElementById("finalPage").classList.remove("hidden");
  }

  this.appendAllNonCorrectQuestionsTo = function (questionContainer) {
    var fragment = document.createDocumentFragment(), length = this.nonCorrectAnsArray.length;
    for (i = 0; i < length; i++) {
      var question = this.nonCorrectAnsArray[i];
      this.appendQuestionElem(question, fragment);
    }
    questionContainer.appendChild(fragment);
  }

  this.goToHomePage = function () {
    location.reload();    
  }

  this.appendQuestionElem = function (question, fragment) {
    questionElem = fragment.appendChild(document.getElementById("worngQuestionTemplate").cloneNode(true));
    questionElem.classList.remove("hidden");
    questionElem.getElementsByClassName("question")[0].innerHTML = question.questionString;
    questionElem.getElementsByClassName("userAns")[0].innerHTML = question.userAnswer;
    questionElem.getElementsByClassName("correctAns")[0].innerHTML = question.correctAnswer;
  }

  this.displayFinalScore = function () {
    document.getElementById("score").innerHTML = "Your Final Score : " + this.score;
  }

  this.updateScore = function () {
    if (parseInt(this.currentQuestion.userAnswer, 10) == this.currentQuestion.correctAnswer) {
      this.score += 1;
      document.getElementById("score").innerHTML = "Score : " + this.score;
    }
  }

  this.nextQuestion = function () {
    return this.questions[this.currentQuestion.questionNumber + 1];
  }

  this.displayQuestion = function () {
    document.getElementById("question").innerHTML = this.currentQuestion.questionString;
  }
}