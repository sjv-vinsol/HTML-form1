window.addEventListener("load", function () {

  String.prototype.trim = function(){
    return this.replace(/^\s+|\s+$/g,'');
  }

  var page = {
    saveButton: document.getElementById( "save_emp" ),
    gridButton: document.getElementById( "show_grid" ),
    listButton: document.getElementById( "show_list" ),
    searchElem: document.getElementById( "mob_search" )
  }

  var isValidEmployee = false, employeeId = 0;

  function Employee (employeeId) {
    this.name = document.getElementById( "emp_name" ).value;
    this.email = document.getElementById( "emp_email" ).value;
    this.mobile = document.getElementById( "emp_mobile" ).value;
    this.uniqueId = employeeId;
  }

  function EmployeeManageSystem () {
    this.currentView = "grid_view";
    // Select between grid_view OR list_view
    this.defaultView = "grid_view";
    this.empList = [];
    this.matchedResult = [];

    this.isUnique = function (attr, value) {
      var length = this.empList.length;
      while (length--) {
        if (this.empList[length][attr] == value) return false
      }
      return true;
    }

    this.isValidName = function () {
      var nameElem = document.getElementById( "emp_name" );
      var name = nameElem.value.trim();
      if (name && /^[ a-zA-Z]+$/.test(name)) {
        nameElem.classList.remove( "invalidInput" );
        return true
      }else { 
        nameElem.classList.add( "invalidInput" );
        return false;
      }
    }    

    this.isValidEmail = function () {
      var emailElem = document.getElementById( "emp_email" );
      var email = emailElem.value.trim();
      if (/^[a-zA-Z]+[\$\_\.]?[0-9a-zA-Z]*@[a-zA-Z]+([\.][a-zA-Z]+){1,4}$/.test(email) && this.isUnique("email", email)) {
        emailElem.classList.remove( "invalidInput" );
        return true
      }else {
        emailElem.classList.add( "invalidInput" );
        return false;
      }
    }

    this.isValidMobile = function () {
      var mobileElem = document.getElementById( "emp_mobile" );
      var mobile = mobileElem.value.trim();
      // TODO trim mobile
      if (this.isUnique("mobile", mobile) && mobile.length == 10) {
        mobileElem.classList.remove( "invalidInput" );
        return true;
      }else {
        mobileElem.classList.add( "invalidInput" );
        return false;
      }
    }

    this.isValidEmployeeDetails = function () {
      if (this.isValidName() & this.isValidEmail() & this.isValidMobile()) { return true }
        else { return false };
    }

    this.heightlightMatchedResults = function () {
      var length = this.matchedResult.length;
      while (length--) {
        if (this.matchedResult[length]) {
          this.matchedResult[length].classList.add( "highlight" );
        }
      }
    }

    this.removeHighlightedResult = function() {
      var length = this.matchedResult.length;
      while (length--) {
        if (this.matchedResult[length]) {
        this.matchedResult[length].classList.remove( "highlight" );
        }
      }
      this.matchedResult = [];
    }

    this.searchByMobileNo = function () {
      var system = this;
      page.searchElem.addEventListener("keyup", function() {
        system.removeHighlightedResult();
        var str = this.value;
        var regex = new RegExp(str);
        var length = system.empList.length;
        while (length--) {
          if (str && system.empList[length].mobile.match(regex)) {
            empId = system.empList[length].uniqueId;
            var elem = document.getElementsByClassName(empId);
            system.matchedResult.push(elem[0]);
            system.matchedResult.push(elem[1]);
          }
        }
        system.heightlightMatchedResults();
      })
    }
      
    this.searchByMobileNo();

    this.displayDefaultView = function() {
      if (this.defaultView = "grid_view") {
        document.getElementById( "grid_view" ).classList.remove( "hidden" );
        page.gridButton.classList.add( "selected" );
      }else if (this.defaultView = "list_view") {
        document.getElementById( "list_view" ).classList.remove( "hidden" );
        page.listButton.classList.add( "selected" );
      }
    }

    this.displayDefaultView();

    this.showGridView = function() {
      page.gridButton.addEventListener("click", function() {
        page.gridButton.classList.add( 'selected' );
        page.listButton.classList.remove( "selected" );
        document.getElementById( "grid_view" ).classList.remove( "hidden" );
        document.getElementById( "list_view" ).classList.add( "hidden" );
        this.currentView = "grid_view";
      }.bind(this))
    }

    this.showListView = function() {
      page.listButton.addEventListener("click", function() {
        page.gridButton.classList.remove( 'selected' );
        page.listButton.classList.add( "selected" );
        document.getElementById( "grid_view" ).classList.add( "hidden" );
        document.getElementById( "list_view" ).classList.remove( "hidden" );
        this.currentView = "list_view";
      }.bind(this));
    }
    this.showListView();
    this.showGridView();

    this.startManaging = function () {
      //Create employee on click on save button
      page.saveButton.addEventListener("click", function(e) {
        if (!this.empList.length) document.getElementById("button_container").classList.remove("hidden");
        e.preventDefault();
        if (this.isValidEmployeeDetails()) {
          var employee = new Employee(employeeId++);
          this.empList.push(employee);
          this.appendEmployeeGridView(employee);
          this.appendEmployeeListView(employee);
        }
      }.bind(this))
    }

    this.removeRecords = function (employeeId) {
      var recordsToRemove = document.getElementsByClassName(employeeId);
      var length = recordsToRemove.length, record = "";
      while (length--) {
        record = recordsToRemove[0];
        record.parentNode.removeChild(record)
      }
    }

    this.appendEmployeeListView = function (employee) {
      var fragment = document.createDocumentFragment();
      var displayListElem = fragment.appendChild(document.createElement( "tr" ));
      displayListElem.classList.add(employee.uniqueId);
      displayListElem.appendChild(document.createElement( "td" )).appendChild(document.createTextNode(employee.name));
      displayListElem.appendChild(document.createElement( "td" )).appendChild(document.createTextNode(employee.email));
      displayListElem.appendChild(document.createElement( "td" )).appendChild(document.createTextNode(employee.mobile));
      var removeLink = displayListElem.appendChild(document.createElement( "td" )).appendChild(document.createElement("a"));
      removeLink.classList.add( "remove_list_record" );
      removeLink.appendChild(document.createTextNode( "Delete" ));
      removeLink.addEventListener("click", function(e) {
        e.preventDefault();
        if( confirm("This record will be deleted permanently. Are you sure want to remove it.")) {
          this.removeRecords(employee.uniqueId);
        }
      }.bind(this));
      document.getElementById( "list_table" ).appendChild(displayListElem);
    }

    this.appendEmployeeGridView = function(employee) {
      var fragment = document.createDocumentFragment();
      var displayGridElem = fragment.appendChild(document.createElement( "div" ));
      displayGridElem.classList.add(employee.uniqueId);
      displayGridElem.classList.add( "grid_emp" );

      var removeButton = displayGridElem.appendChild(document.createElement( "div" ));
      removeButton.classList.add( "remove_grid" );
      removeButton.appendChild(document.createTextNode( "D" ));

      var pElement = displayGridElem.appendChild(document.createElement( 'p' ));
      pElement.classList.add( "grid_emp_detail" );
      pElement.appendChild(document.createTextNode("Name :  "+employee.name+""));

      var pElement = displayGridElem.appendChild(document.createElement( 'p' ));
      pElement.classList.add( "grid_emp_detail" );
      pElement.appendChild(document.createTextNode("Email :  "+employee.email+""));

      var pElement = displayGridElem.appendChild(document.createElement( 'p' ));
      pElement.classList.add( "grid_emp_detail" );
      pElement.appendChild(document.createTextNode("Mobile :  "+employee.mobile+""));

      
      removeButton.addEventListener("click", function() {
        if (confirm("This record will be deleted permanently. Are you sure want to remove it.")) {
          this.removeRecords(employee.uniqueId);
        }
      }.bind(this));
      document.getElementById( "grid_view" ).appendChild(displayGridElem);
    }
  }

  (function startManagingEmployee() {
    var system = new EmployeeManageSystem();
    system.startManaging();
  })();
})