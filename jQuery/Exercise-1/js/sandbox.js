$(document).ready(function () {
  console.log("All div with class module  : ", $("div.module"));

  console.log("\n\nThree selectors to select third item of #myList")
  console.log("First  :  ", $(":contains(List item 3)").last());
  console.log("Second  :  ", $("#myListItem"));
  console.log("Third  :  ", $("#myList li:eq(2)"));
  console.log("In first if text of third item is changed then this will no longer work.");
  console.log("Second one is the best one as it directly searches from Id");
  console.log("If Id is not present then third method is the best as it is independent of text OR Id OR class of item.");

  console.log("\n\nLabel for the search input using an attribute selector", $("label[for='q']"));

  console.log("\n\nHidden elements in the page", $("body").find(":hidden").not("script").length);

  console.log("\n\nImage element that have alt attribute", $("img[alt]").length);

  console.log("Odd trable rows in table body", $("tbody tr:even"));
})