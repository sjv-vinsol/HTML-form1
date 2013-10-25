var blogList = $( ".listText" );
blogList.each(function(index, elem) {
   $(this).click(function(event) {
    event.preventDefault();     //Prevent the link(anchor tag) default behaviour.
    var descriptionPara = $(this).closest("li").first().find("p.excerpt");
    descriptionPara.slideToggle(function(){
      $("#blog p.excerpt").not(descriptionPara).slideUp();     //Callback function to slide up any other opened para.
    });
  })
})