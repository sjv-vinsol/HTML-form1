window.addEventListener("load", function() {
  var main = {
    fieldsForEmptyValidation: {
      loginId: document.getElementById("loginId"),
      name: document.getElementById("name"),
      email: document.getElementById("email"),
      timezone: document.getElementById("timezone"),
      homepage: document.getElementById("homepage"),
      about: document.getElementById("about"),
    },

    otherInputFields: {
      receiveNotification: document.getElementById("notification"),
      register: document.getElementById("register")
    },

    validateForm: function (e) {
      var elem = Object.keys(main.fieldsForEmptyValidation), hasError = false, status = null;
      for (i=0; i<elem.length; i++) {
        status = main.isEmpty(main.fieldsForEmptyValidation[elem[i]]);
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
      if (main.fieldsForEmptyValidation.about.value.length < 50 ) {
        alert("Minimum 50 characters are required in About Us field");
      }
    },

    confirmReceiveNotification: function () {
      var confirmText = (main.otherInputFields.receiveNotification.checked) ? "CONFIRM: You are subscribed to receive notification":"CONFIRM:You are not subscribed to receive notification";
      return confirm(confirmText);
    }
  }
  // bind click event to submit button 
  main.otherInputFields.register.addEventListener("click", main.validateForm);
})