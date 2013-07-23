window.addEventListener("load", function() {
  formObj = function(formName) {
    "use stict";
    this.url = document.forms[formName].url;
    this.extractDomainAndSubdomain = function (){
      // regexStr holds the regex to match string containing only domain and subdomain. Ex: http://help.google.com/, regexStr will match "help.google.com".
      var regexStr = /[a-z]+(\.[a-z]+)+/, regexDomain = /[a-z]+(\.[a-z]+)$/;
      var str = this.url.value.match(regexStr)[0];
      var domain = str.match(regexDomain)[0];
      this.msg = "Domain :" + domain;
      var subDomain = str.substring(0, (str.length - domain.length)-1);
      if (subDomain) {
        this.msg += "\nSubdomain : " + subDomain;
      }
    }
    this.isValidUrl = function () {
      var regex = /^((https?|ftp):\/\/)([a-zA-Z]+\.)+[a-zA-Z]+\/[^\s]*$/;
      return regex.test(this.url.value);
    }
  }
  // Binding a function on click event of submit button
  document.getElementById("submit").addEventListener("click", function(e) {
    var form = new formObj("form1");
    if (form.isValidUrl()) {
      form.extractDomainAndSubdomain();
      alert(form.msg);
    } else {
      alert("Please enter a valid Url");
      e.preventDefault();
    }
  });
})