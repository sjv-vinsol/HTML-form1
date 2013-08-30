var userAnswer = document.getElementById("ans").value;
var operatorJSON = {1: "*", 2: "/", 3: "+", 4: "-"};
window.addEventListener("load", function() {
  (function timer() {
    var seconds = 20;
    setInterval(function() {
      if (seconds >= 0) {
        document.getElementById("timer").innerHTML = seconds--;
      }
    }, 1000);
  })();

  function main() {
    var questionNumber = 0;
    var numberArray = generateNumbersAndOperator();
    var answer = returnAnswer[numberArray[2]];
    


  }

  function generateNumbersAndOperator() {
    var answer = "";
    var number1 = Math.floor(Math.random() * 10 + Math.random() * 10+ 1);
    var number2 = Math.floor(Math.random() * 10 + Math.random() * 10+ 1);
    var operator = getOperator();
    //console.log("number1", operator);
    //var answer = getAnswer();
    return ([number1, number2, operator]);
  }



  function returnAnswer(operator) {
    switch (operator) {
      case 1: return "number1 * number2"
      case 2: return "number1 / number2"
      case 3: return "number1 + number2"
      case 4: return "number1 - number2"
    }
  }

  function getOperator() {
    var operator = 8;
    while(operator > 4) operator = Math.floor(Math.random()*10);
    return operator;
  }







})