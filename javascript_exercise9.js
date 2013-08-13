var _emailRegex = /^\w([\.\$\?\&\_]?\w+)*@([a-zA-Z]+\.)+[a-zA-Z]+$/;
var _urlRegex = /^[\s]*(?:(?:https?|ftp):\/\/)?(?:[\w]+\.)*[\w]+\.[\w]+(?:[\/]+[^\s]*)*[\s]*$/;
window.addEventListener("load", function() {
  var main = {
    Form: function (formName, validateFieldArr) {
      "use strict";
      var invalidForm = true;
      this.email = document.forms[formName].email;
      this.homepage = document.forms[formName].url;
      this.validateUsingRegex = function (currfieldObj, regex) {
        var isValidString = regex.test(currfieldObj.value);
        if (!isValidString) alert(currfieldObj.name + " is invalid");
        return isValidString;
      }
      this.isValid = function() {
        return (this.validateUsingRegex(this.homepage, _urlRegex) & this.validateUsingRegex(this.email, _emailRegex));
      }
    },
  }
  document.getElementById("register").addEventListener("click", function(e) {
    var form = new main.Form("form1", ["email", "url"]);
    if (form.isValid()) form.submit();
    else e.preventDefault();
  });
});