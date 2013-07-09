function User(name) {
  this.name = name;
  this.age = parseInt(assignAge(name), 10);
  function assignAge() {
    age = prompt("Provide age of " + name + " :");
    if (age == null) {
      document.write("<h3>Please reload the page to compare again.</h3>")
      exit();
    }
    else if (isNaN(age) || age == "") {
      return assignAge();
    } else {
      return age;
    }
  }
}
var user1 = new User("Vikash");
var user2 = new User("Sanjeev");
user1.compare = function (user2) {
  text = (user1.age > user2.age) ? "Vikash is older than Sanjeev" : "Sanjeev is older than Vikash";
  if (user1.age === user2.age) {
    text = "Both user have equal age";
  }
}
user1.compare(user2);
window.alert(text);
document.write("<h3>Please reload the page to compare again.</h3>");