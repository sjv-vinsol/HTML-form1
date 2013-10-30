var $blogList = $("#blog > ul").find("h3");
$blogList.click(function(event) {
    event.preventDefault();     //Prevent the link(anchor tag) default behaviour.
    $("#blog p.excerpt:visible").slideUp();     //Callback function to slide up any other opened para.
    var descriptionPara = $(this).siblings("p.excerpt:hidden").slideToggle();
})