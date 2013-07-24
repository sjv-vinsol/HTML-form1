window.addEventListener("load", function() {
  var main = {
    form: {
      loginId: document.getElementById("loginId"),
      name: document.getElementById("name"),
      email: document.getElementById("email"),
      timezone: document.getElementById("timezone"),
      homepage: document.getElementById("homepage"),
      about: document.getElementById("about"),
      receiveNotification: document.getElementById("notification"),
      register: document.getElementById("register")
    },

    validateForm: function (e) {
      var elem = Object.keys(main.form), hasError = false, status = null;
      for (i=0; i<elem.length-2; i++) {
        status = main.isEmpty(main.form[elem[i]]);
        hasError = (status) ? status : hasError;
      }

      hasError = (main.characterCountCheck()) ? true : hasError;
      if (hasError || !main.confirmReceiveNotification()) {
        e.preventDefault();      
      }
    },

    isEmpty: function (elemForm) {
      if (elemForm.value == "") {
        alert(elemForm.id+ " can't be empty");
        return true;       
      }
    },

    characterCountCheck: function () {
      if (main.form.about.value.length < 50 ) {
        alert("Minimum 50 characters are required in About Us field");
      }
    },

    confirmReceiveNotification: function () {
      var confirmText = (main.form.receiveNotification.checked) ? "CONFIRM: You are subscribed to receive notification":"CONFIRM:You are not subscribed to receive notification";
      return confirm(confirmText);
    }
  }
  // bind click event to submit button 
  main.form.register.addEventListener("click", main.validateForm);
})