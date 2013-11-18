// For security reasons, on Chrome and Opera you cannot use XMLHttpRequest to load local files.
// You must run it on a web server, even if that web server is running on localhost.
// The above flag will allow chrome to run file:// url also.
// Below code will work fine on production wiht http:// url.
var pathname = "data/blog.html", dataLoaded = false;
var $headlines = $( '#blog' ).find("h3").after($( '<div/>', {class: "blogPost"} )).find("a");
// These are the ID which are present in the reference file.
var referenceIdArr = ["post1", "post2", "post3" ];

function appendDataToDOM(loadedData, $displayBlogDiv) {
  var length = $displayBlogDiv.length;
  while (length--) {
    $displayBlogDiv.eq(length).append(loadedData.find("#"+referenceIdArr[length]+""));
  }
  $displayBlogDiv.hide();
}

$headlines.click(function(event) {
  event.preventDefault();
  var headline = $(this);
  if (!dataLoaded) {
    var $displayBlogDiv = headline.closest("ul").find($( ".blogPost" ));
    var loadedData = $('<div/>', {id: "loadedPost"}).load(pathname, function() {
      appendDataToDOM(loadedData, $displayBlogDiv);
      headline.closest('li').find('.blogPost').toggle();
      dataLoaded = true;
    });
  } else {
    headline.closest('li').find('.blogPost').toggle();
  }
})