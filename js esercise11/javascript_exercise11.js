window.addEventListener("load", function() {
  var main = {
    regex: /^((https?|ftp):\/\/)?(([\w]+\.)*)([\w]+\.[\w]+)([\/][^\s]*)*$/,
    formObj: function(formName) {
      "use stict";
      this.url = document.forms[formName].url;
      this.hasValidUrl = function () {
        if (this.url.value.match(main.regex)) return true
          else return false;
      }
      this.extractDomainAndSubdomain = function () {
        var str = this.url.value.match(main.regex);
        return ([str[5],str[3].slice(0,-1)]);
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
      (domainSubdomainArr[1]) ? alert("Domain: " + domainSubdomainArr[0] + "\nSub Domain: " + domainSubdomainArr[1]) : alert("Domain: " + domainSubdomainArr[0]);
    }
  });
})