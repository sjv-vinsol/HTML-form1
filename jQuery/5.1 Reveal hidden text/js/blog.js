var blogList = $("#blog > ul").find("h3");
blogList.each(function(index, elem) {
   $(this).click(function(event) {
    event.preventDefault();     //Prevent the link(anchor tag) default behaviour.
    var descriptionPara = $(this).siblings("p.excerpt");
    descriptionPara.slideToggle();
    $("#blog p.excerpt:visible").not(descriptionPara).slideUp();     //Callback function to slide up any other opened para.
  })
})