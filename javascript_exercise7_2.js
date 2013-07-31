var main = {
  checkAndOpenUrl: function (url) {
    "use strict";
    if( url) {
      return (window.open(url,"popup","height=450,width=400,top=100,left=400,status=no,menubar=no"));
    } else if (url == null) return true;
    else if (url == "") return alert("url is empty. Try again!!");
  }
}
do {
  var url = prompt("Enter Url");
} while (!main.checkAndOpenUrl(url));