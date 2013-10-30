var pathname = "data/blog.html";
var $headlines = $( '#blog' ).find("h3").after($( '<div/>', {class: "blogPost"} )).find("a");
referenceIdArr = ["post1", "post2", "post3" ];       // THese are the ID which are present in the reference file.

$.each($( '#blog' ).find("h3"), function(index, data){
  $(this).data("referenceId", referenceIdArr[index]);
})

$headlines.click(function(event) {
  var $displayBlogDiv = $(this).closest("li").find($( ".blogPost" ));
  $displayBlogDiv.load(pathname + " " + "#"+ referenceIdArr[$headlines.index($(this))]);
  event.preventDefault();
})