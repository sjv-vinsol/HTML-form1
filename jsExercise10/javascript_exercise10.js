window.addEventListener("load", function() {
  var main = {
    formObj: function (formName) {
      "use strict";
      this.firstNameObj = document.forms[formName].fname;
      this.resultObj = document.forms[formName].result;
      this.isNumeric = function() {
        var regex = /^([+]|[-])?\d+(\.[\d]+)?$/;
        return regex.test(this.firstNameObj.value);
      }
    }
  }
  document.form1.addEventListener("submit", function(e) {
    var form = new main.formObj("form1");
    (form.isNumeric()) ? (form.resultObj.value = "true") : (form.resultObj.value = "false");
    if (!form.isNumeric()) e.preventDefault();
  })
})