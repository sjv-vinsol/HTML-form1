$(document).ready(function() {
  function add5ListElement() {
    var length = $("#myList").children("li").length;
    for(i=length+1;i<length+6;i++) {
      var elem = $("<li/>")
      elem.text("List item " + i);
      elem.appendTo($("#myList"));
    }
  }

  console.log("1. Added five new list items to the end of the unordered list #myList")
  add5ListElement();

  console.log("\n\n2. Remove odd listed items  : ", $("#myList li").filter(":even").remove());

  console.log("\n\n3. Add another h2 and another paragraph to the last div.module", $("#specials").append($("<h2/>"), $("<p/>")));

  console.log("\n\n4. Add another option to the select element; give the option the value 'Wednesday'");
  console.log($("select[name=day]").append($("<option/>").text("Wednesday").val("wednesday")));

  console.log("\n\n5. Add a new div.module to the page after the last one; put a copy of one of the existing images inside of it.");
  console.log($("div.module").last().after("<div class='module'></div>").next().append("<img src='images/vegetable.jpg'>"));
})