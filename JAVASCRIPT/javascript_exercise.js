function User(name) {
  this.name = name;
  this.age = parseInt(validateAndAssignAge(name), 10);
  function validateAndAssignAge() {
    age = prompt("Enter age of " + name + " :");
    if (age == null) {
      document.write("<h3>Please reload the page to compare again.</h3>")
      exit();
    }
    else if (isNaN(age) || age == "") {
      return validateAndAssignAge();
    } else {
      return age;
    }
  }
}
var user1 = new User("Vikash");
var user2 = new User("Sanjeev");
user1.compare = function (user2) {
  if (user1.age === user2.age) {
    text = "Both user have equal age";
  } else { text = (user1.age > user2.age) ? ""+user1.name+" is older than "+user2.name+"" : ""+user2.name+" is older than "+user1.name+""};
  
}
user1.compare(user2);
window.alert(text);
document.write("<h3>Please reload the page to compare again.</h3>");