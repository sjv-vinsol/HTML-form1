window.addEventListener("load", function() {
  var main = {
    form: function (formName, validateFieldArr) {
      "use strict";
      var invalidForm = true;
      this.email = document.forms[formName].email;
      this.homepage = document.forms[formName].url;
      this.emailRegex = /^\w([\.\$\?\&\_]?\w+)*@([a-zA-Z]+\.)+[a-zA-Z]+$/;
      this.urlRegex = /^[\s]*(?:(?:https?|ftp):\/\/)?(?:[\w]+\.)*[\w]+\.[\w]+(?:[\/]+[^\s]*)*[\s]*$/;
      this.validateUsingRegex = function (currfieldObj, regex) {
        if (regex.test(currfieldObj.value)) {
          currfieldObj.classList.add("normal");
        } else {
          invalidForm = false;
          alert(currfieldObj.name + " is invalid");
          currfieldObj.classList.add("error"); currfieldObj.classList.remove("normal");
        }
      }
      this.isValid = function() {
        this.validateUsingRegex(this.email, this.emailRegex);
        this.validateUsingRegex(this.homepage, this.urlRegex);
        return invalidForm;
      }
    },
  }
  document.getElementById("register").addEventListener("click", function(e) {
    var form = new main.form("form1", ["email", "url"]);
    if (form.isValid()) form.submit();
    else e.preventDefault();
  });
});