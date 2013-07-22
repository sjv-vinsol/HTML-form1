window.addEventListener("load", function() {
  var main = {
    submitForm: function (e , formName, validateFieldArr) {
      "use strict";
      var form = new main.formObj(formName, validateFieldArr);
      if (form.valid) {
        form.submit();
      } else e.preventDefault();
    },

    formObj: function (formName, validateFieldArr) {
      "use strict";
      var validFieldCount = 0;
      var email = document.forms[formName].email;
      var homepage = document.forms[formName].url;

      var validateUsingRegex = function (currfieldObj, regex) {
        if (regex.test(currfieldObj.value)) {
          validFieldCount++;
          currfieldObj.className = "normal";
        } else {
          alert(currfieldObj.name + " is invalid");
          main.paintRed(currfieldObj);
        }
      }

      validateUsingRegex(email, /^\w([\.\$\?\&\_]?\w+)*@([a-zA-Z]+\.)+[a-zA-Z]+$/);
      validateUsingRegex(homepage, /^((https?|ftp):\/\/)([a-zA-Z]+\.)+[a-zA-Z]+\/[^\s]*$/);

      if (validFieldCount == validateFieldArr.length) {
        this.valid = true;
      } else this.valid = false;
    },

    paintRed: function (currfieldObj) {
      "use strict";
      currfieldObj.className = "error";
    }
  }
  document.getElementById("register").addEventListener("click", function(e) {
    var fieldArr = ["email", "url"];
    main.submitForm(e, "form1", fieldArr);
  });
});