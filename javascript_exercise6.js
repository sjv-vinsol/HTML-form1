window.addEventListener("load", function() {
  var namePrompt = ["First Name", "Last Name"], name= [], len = 0;
  for(len=0;len<namePrompt.length;len++) {
    do {
      name[len] = prompt(namePrompt[len]);
    } while (!(name[len] = extractNameMatchingRegex(name[len])));
  }
  alert("Hello "+name[0]+" "+name[1]+".");
  document.write("Hello "+name[0]+" "+name[1]+".");

  function extractNameMatchingRegex(name) {
    "use strict";
    if (name==null) {
      document.write("Please reload the page to start again");
    }
    if (name.match(/[a-z]+/ig)) return name.match(/[a-z]+/ig).join(" ");
  }
});