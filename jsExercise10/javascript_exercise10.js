window.addEventListener("load", function() {
  var main = {
    submitForm: function (e, formName, fieldObjArr) {
      "use strict";
      var form = new main.formObj(formName, fieldObjArr);
      if (form.valid) {
        form.submit();
      } else e.preventDefault();
    },

    formObj: function (formName, fieldObjArr) {
      "use strict";
      this.firstNameObj = document.forms[formName].fname;
      this.resultObj = document.forms[formName].result;
      var regex = /(^([+]|[-])?\d+(\.[\d]+)?$|^[\da-f]+$)/;
      if (regex.test(this.firstNameObj.value)) {
        this.resultObj.value = "true";
        this.valid = true;
      }else {
        this.resultObj.value = "false";
        this.valid = false;
      }
    }
  }
  document.form1.addEventListener("submit", function(e) {
    main.submitForm(e, "form1", ["fname", "result"]);
  })
})