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

    label: document.getElementsByTagName("label"),

    validateForm: function (e) {
      var msg="", elem = form1.elements;
      for (i=0; i<elem.length-2; i++) {
        if (elem[i].value == "") {
          alert(main.label[i].innerHTML+ " can't be empty");
          e.preventDefault();
        }
      }
      if (main.form.about.value.length < 50 ) {
        alert("Minimum 50 characters are required in About Us field");
        e.preventDefault();
      }
      var emailRegex = /^\w([.$&_]*\w+)*@([a-zA-Z]+\.)+[a-zA-Z]+$/;
      var urlRegex = /^((https?|ftp):\/\/)([a-zA-Z]+\.)+[a-zA-Z]+\/[^\s]*$/;
      if (main.form.email.value && !emailRegex.test(main.form.email.value)) {
        alert("Invalid Email");
        e.preventDefault;
      }
      if (main.form.homepage.value && !urlRegex.test(main.form.homepage.value)) {
        alert("Invalid Url");
        e.preventDefault;
      }
    },
  }
  // bind click event to submit button 
  main.form.register.addEventListener("click", main.validateForm);
})