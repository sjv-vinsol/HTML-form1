// For security reasons, on Chrome and Opera you cannot use XMLHttpRequest to load local files.
// You must run it on a web server, even if that web server is running on localhost.
// The above flag will allow chrome to run file:// url also.
// Below code will work fine on production wiht http:// url.
var pathname = "data/blog.html";
var $headlines = $( '#blog' ).find("h3").after($( '<div/>', {class: "blogPost"} )).find("a");
// These are the ID which are present in the reference file.
referenceIdArr = ["post1", "post2", "post3" ];

$.each($( '#blog' ).find("h3"), function(index, data){
  $(this).data("referenceId", referenceIdArr[index]);
})

$headlines.click(function(event) {
  var $displayBlogDiv = $(this).closest("li").find($( ".blogPost" ));
  $displayBlogDiv.load(pathname + " " + "#"+ referenceIdArr[$headlines.index($(this))]);
  event.preventDefault();
})