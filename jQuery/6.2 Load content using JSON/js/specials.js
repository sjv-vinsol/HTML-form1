var $displaySpecialDiv = $("#specialContent").removeClass("hidden");
$("#specials").find("form").after($displaySpecialDiv);

$.ajax({
  url: "data/specials.json",
  dataType: "json",
  success: function(jsonResponse) {
    $("#specials form select").bind("change", function(){
      var val = $(this).val();
        var specialDayData = jsonResponse[val];
        if (specialDayData) {
          $("#title").html(specialDayData["title"]);
          $("#text").html(specialDayData["text"]);
          $("#image").attr("src", specialDayData["image"]);
          $("#color").html(specialDayData["color"]);
        }
    })
  }
})
$("#specials form li.buttons").remove();