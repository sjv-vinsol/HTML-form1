var main = {
  checkAndOpenUrl: function (url) {
    "use strict";
    if( url) {
      var xhr = new XMLHttpRequest();
      xhr.open("get", "jsRender7.html", false);
      xhr.send();
      console.log(xhr.responseXML);
      //console.log("xhr text:   ", xhr.responseText);
      var iframe = xhr.responseXML.getElementsByTagName("iframe")[0];
      console.log(iframe);
      iframe.setAttribute("src",url);
      console.log(iframe);
      var pst = new XMLHttpRequest();
      pst.open("post", "jsRender7.html", false);
      pst.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      console.log("asdfasdfasdf" , pst.send(xhr.responseXML);
      window.open("jsRender7.html", "", "");
      return true;
    } else if (url == null) return true;
    else if (url == "") return alert("url is empty. Try again!!");
  }
}
do {
  var url = prompt("Enter Url");
} while (!main.checkAndOpenUrl(url));