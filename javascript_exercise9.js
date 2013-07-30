window.addEventListener("load", function() {
  var main = {
    submitForm: function (e , formName, validateFieldArr) {
      "use strict";
      var form = new main.formObj(formName, validateFieldArr);
      if (form.isValid()) form.submit();
      else e.preventDefault();
    },

    formObj: function (formName, validateFieldArr) {
      "use strict";
      var validFieldCount = 0;
      this.email = document.forms[formName].email;
      this.homepage = document.forms[formName].url;
      this.validateUsingRegex = function (currfieldObj, regex) {
        if (regex.test(currfieldObj.value) && ++validFieldCount) {
          currfieldObj.classList.add("normal");
        } else {
          alert(currfieldObj.name + " is invalid");
          currfieldObj.classList.add("error");
        }
      }
      this.isValid = function() {
        this.validateUsingRegex(this.email, /^\w([\.\$\?\&\_]?\w+)*@([a-zA-Z]+\.)+[a-zA-Z]+$/);
        this.validateUsingRegex(this.homepage, /^[\s]*(?:(?:https?|ftp):\/\/)?(?:[\w]+\.)*[\w]+\.[\w]+(?:[\/]+[^\s]*)*[\s]*$/);
        if (validFieldCount == validateFieldArr.length) return true;
        else return false;
      }
    },
  }
  document.getElementById("register").addEventListener("click", function(e) {
    main.submitForm(e, "form1", ["email", "url"]);
  });
});