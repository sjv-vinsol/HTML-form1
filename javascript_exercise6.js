window.addEventListener("load", function() {
  var namePrompt = ["First Name", "Last Name"], name= [], len = 0, msg = "";
  for(len=0;len<namePrompt.length;len++) {
    do {
      name[len] = prompt(namePrompt[len]);
    } while (!(name[len] = extractNameMatchingRegex(name[len])));
  }
  msg = "Hello "+name[0]+" "+name[1]+".";
  alert(msg); document.write(msg);
});

function extractNameMatchingRegex(name) {
  "use strict";
  var matchedName = "";
  if (name==null) {
    document.write("Please reload the page to start again");
  }
  if (matchedName = name.match(/[a-z]+/ig)) return matchedName.join(" ");
}