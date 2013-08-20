var main = {
  checkAndOpenUrl: function (url) {
    "use strict";
    if( url) {
      var obj = window.open(null,"popup","height=450,width=400,top=100,left=400,status=no,menubar=no");
      var iframe = obj.document.getElementsByTagName("body")[0].appendChild(obj.document.createElement("iframe"));
      iframe.src = url; iframe.scrolling = "no";
      iframe.setAttribute("style", "height:100%;width:100%;border:0px");
      obj.document.getElementsByTagName("body")[0].style.overflow = "hidden";
      return true;      
    } else if (url == null) return true;
    else if (url == "") return alert("url is empty. Try again!!");
  }
}
do {
  var url = prompt("Enter Url");
} while (!main.checkAndOpenUrl(url));