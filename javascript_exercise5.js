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
    var confirmText = (main.form.receiveNotification.checked) ? "CONFIRM: You have subscribed to receive notification":"CONFIRM:You have not subscribed to receive notification";
    var msg="", elem = form1.elements; noError= true;
    for (i=0; i<elem.length-2; i++) {
      if (elem[i].value == "") {
        alert(main.label[i].innerHTML+ " can't be empty");
        e.preventDefault(); noError = false;
      }
    }
    if (main.form.about.value.length < 50 ) {
      alert("Minimum 50 characters are required in About Us field");
      e.preventDefault(); noError = false;
    }
    if (noError) {
      if (!confirm(confirmText)) {
        e.preventDefault();
      }
    }
  },
}
// bind click event to submit button 
main.form.register.addEventListener("click", main.validateForm);