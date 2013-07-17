var main = {
  checkAndOpenUrl: function (url) {
    "use strict";
    var blocked = false;
    if (url || url == null) {
      if (url) {
        try { 
          var obj = window.open(url,"","height=450, width=400, top=100, left=400, status=no, menubar=no");
          if (obj==null) {
            blocked = true;
          }
        }
        catch(err) { blocked = true;}
      }
      if (blocked) alert("Pop up is blocked!!");
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