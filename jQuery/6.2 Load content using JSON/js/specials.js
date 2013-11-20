var $displaySpecialDiv = $("#specialContent").removeClass("hidden");
$("#specials").find("form").after($displaySpecialDiv);

function displaySpecials(specialData) {
  $("#title").html(specialData["title"]);
  $("#text").html(specialData["text"]);
  $("#image").attr("src", specialData["image"]);
  $("#color").html(specialData["color"]);
}
var jsonFetched = false, response = {};

$("#specials form select").on("change", function(){
  var day = $(this).val();
  if (!jsonFetched) {
    $.ajax({
      url: "data/specials.json",
      dataType: "json",
      success: function(jsonResponse) {
        response = jsonResponse;
        jsonFetched = true;
        displaySpecials(response[day]);
      }
    })
  } else {
    if (day) displaySpecials(response[day]);
  }
})
$("#specials form li.buttons").remove();