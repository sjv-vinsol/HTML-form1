var main = {
  checkAndOpenUrl: function (url) {
    "use strict";
    if (url || url == null) {
      if (url) window.open(url,"","height=450, width=400, top=100, left=400, status=no, menubar=no");
      exit();
    }
    if( url == "") {
      return alert("url is empty. Try again!!");
    }
  }
}
do {
  var url = prompt("Enter Url");
} while (!main.checkAndOpenUrl(url));