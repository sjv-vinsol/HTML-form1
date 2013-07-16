window.addEventListener("load", function() {
  do {
    var fname = prompt("First Name");
   } while (!(fname = MatchAndCheck(fname)));
  do {
      var lname = prompt("Last Name");
     } while (!(lname = MatchAndCheck(lname)));
  document.write("Hello "+fname+" "+lname+".");

  function MatchAndCheck(name) {
    "use strict";
    if (name==null) {
      document.write("Please reload the page to start again");
    }
    return name.match(/[a-zA-Z].*[a-zA-Z]/);
  }
});