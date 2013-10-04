$(document).ready( function () {
  console.log("Log each image's alt attribute");
  $.each( $("img"), function (i, val) {
    console.log(val.alt);
  })

  console.log("\n");

  console.log("Select search field and add class to its parent");
  console.log( $("input[name='q']").parent().addClass("someClass"));

  console.log("\n");

  console.log("Remove class current and add it to next element");
  console.log($("#myList .current").removeClass("current").next().addClass("current"));

  console.log("\n");

  console.log("select element inside #specials and traverse your way to the submit button");
  console.log($("#specials select").parent().next().children().first());

  console.log("\n");

  console.log("Add class 'current' to first line item of #slideshow and add class 'disabled' to its siblings");
  console.log($.each($("#slideshow > :first-child").addClass('current').siblings(), function (i, val){
    val.classList.add("disabled");
  }));
})