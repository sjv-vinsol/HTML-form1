$(document).ready( function () {
  console.log("1. Log each image's alt attribute");
  $.each( $("img"), function (i, val) {
    console.log(val.alt);
  })

  console.log("\n\n2. Select search field and add class to its parent");
  console.log( $("input[name='q']").closest("form").addClass("someClass"));

  console.log("\n\n3. Remove class current and add it to next element");
  console.log($("#myList li.current").removeClass("current").nextAll("li").first().addClass("current"));

  console.log("\n\n4. Select the select element inside #specials and traverse your way to the submit button");
  console.log($("#specials").find("select[name='day']").parents("form").first().find("input[type='submit']"));

  console.log("\n\n5. Add class 'current' to first line item of #slideshow and add class 'disabled' to its siblings");
  console.log($("#slideshow > li:first").addClass('current').siblings().addClass('disabled'));
})