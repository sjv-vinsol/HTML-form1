function createDisplayContainer() {
  var displayContainer = $("<div/>").attr({id: "specialContent"});
  $('<h3/>').attr("id", "title").appendTo(displayContainer);
  $('<p/>').attr("id", "text").appendTo(displayContainer);
  $('<img/>').attr("id", "image").appendTo(displayContainer);
  $('<h4/>').attr("id", "color").appendTo(displayContainer);
  return displayContainer;
}

(function appendDisplayContainer() {
  $("#specials").find("form").after(createDisplayContainer());
})();

function displaySpecials(specialData) {
  $("#title").html(specialData["title"]);
  $("#text").html(specialData["text"]);
  $("#image").attr("src", specialData["image"]);
  $("#color").html(specialData["color"]);
}

$("#specials form select").one("change", function(){
  var day = $(this).val();
  $.ajax({
    url: "data/specials.json",
    dataType: "json",
    success: function(jsonResponse) {
      displaySpecials(jsonResponse[day]);
      bindChangeEvent(jsonResponse);
    }
  })
})

function bindChangeEvent(jsonResponse) {
  $("#specials form select").on("change", function(){
    var day = $(this).val();
    if (day) displaySpecials(jsonResponse[day]);
  })
}

$("#specials form li.buttons").remove();