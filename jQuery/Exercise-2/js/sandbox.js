$(document).ready( function () {
  console.log("Log each image's alt attribute");
  $.each( $("img"), function (i, val) {
    console.log(val.alt);
  })

  console.log("\n\nSelect search field and add class to its parent");
  console.log( $("input[name='q']").parent().addClass("someClass"));

  console.log("\n\nRemove class current and add it to next element");
  console.log($("#myList .current").removeClass("current").next().addClass("current"));

  console.log("\n\nSelect element inside #specials and traverse your way to the submit button");
  console.log($("#specials select").parent().next().children().first());

  console.log("\n\nAdd class 'current' to first line item of #slideshow and add class 'disabled' to its siblings");
  console.log($.each($("#slideshow > :first-child").addClass('current').siblings(), function (i, val){
    val.classList.add("disabled");
  }));
})