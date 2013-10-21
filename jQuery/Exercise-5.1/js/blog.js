var elemA = $( ".listText" );
elemA.each(function(index, elem) {
   $(this).click(function(event) {
    event.preventDefault();     //Prevent the link(anchor tag) default behaviour.
    var elemP = $(this).closest("li").first().find("p.excerpt");
    elemP.slideToggle(function(){
      $("#blog p.excerpt").not(elemP).slideUp();     //Slide up any other opened para.
    });
  })
})