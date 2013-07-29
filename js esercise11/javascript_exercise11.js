window.addEventListener("load", function() {
  var main = {
    regex: /^[\s]*(?:(?:https?|ftp):\/\/)?(?:([a-z]+(?:\.[a-z]+)*?)\.)?([\w]+\.[\w]+)(?:[\/]+[^\s]*)*[\s]*$/,
    formObj: function(formName) {
      "use stict";
      this.url = document.forms[formName].url;
      this.hasValidUrl = function () {
        return (main.regex.test(this.url.value));
      }
      this.extractDomainAndSubdomain = function () {
        var str = this.url.value.match(main.regex);
        return ([str[1],str[2]]);
      }
    }
  }

  document.getElementById("submit").addEventListener("click", function(e) {
    var form = new main.formObj("form1");
    if (!form.hasValidUrl()) {
      alert("Please enter a valid Url");
      e.preventDefault();
    } else {
      domainSubdomainArr = form.extractDomainAndSubdomain();
      (domainSubdomainArr[0]) ? alert("Domain: " + domainSubdomainArr[1] + "\nSub Domain: " + domainSubdomainArr[0]) : alert("Domain: " + domainSubdomainArr[1]);
    }
  });
})