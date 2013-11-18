// For security reasons, on Chrome and Opera you cannot use XMLHttpRequest to load local files.
// You must run it on a web server, even if that web server is running on localhost.
// The above flag will allow chrome to run file:// url also.
// Below code will work fine on production wiht http:// url.
// var pathname = "data/blog.html";
var $headlines = $( '#blog h3' ).after($( '<div/>' ).attr("class", "blogPost")).find("a");

$headlines.click(function(event) {
  event.preventDefault();
  var $headline = $(this);
  var $displayBlogDiv = $headline.closest("li").find( ".blogPost" );
  // Loop to check whether the headlines have data or not
  if ($displayBlogDiv.children().length <= 0) {
    var href = $headline.attr("href").split("#");
    var pathname = href[0], referenceId = href[1];
    // $displayBlogDiv.load(""+pathname+" #"+referenceId+"");
    $displayBlogDiv.load(pathname + " #" + referenceId);
  } else {
    $displayBlogDiv.toggle();
  }
});