window.addEventListener("load", function() {
  var main = {
    form: {
      email: document.getElementById("email"),
      homepage: document.getElementById("homepage"),
      register: document.getElementById("register")
    },

    validateForm: function (e) {
      "use strict";      
      var elem = form1.elements;
      var isValidEmail = main.isInvalid("email", main.form.email.value);
      var isValidUrl = main.isInvalid("url", main.form.homepage.value);
      if ( isValidEmail || isValidUrl) {
        e.preventDefault();
      }
    },

    isInvalid: function(str, value) {
      "use strict";
      var regex = (str == "email") ? /^\w([.$&_]*\w+)*@([a-zA-Z]+\.)+[a-zA-Z]+$/ : /^((https?|ftp):\/\/)([a-zA-Z]+\.)+[a-zA-Z]+\/[^\s]*$/
      if (!regex.test(value)) {
        alert("Invalid "+str);
        return true;
      }
    }
  }
  // bind click event to submit button
  main.form.register.addEventListener("click", main.validateForm);
})