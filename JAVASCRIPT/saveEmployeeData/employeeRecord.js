window.addEventListener("load", function () {

  String.prototype.trim = function(){
    return this.replace(/^\s+|\s+$/g,'');
  }

  var page = {
    saveButton: document.getElementById( "save_emp" ),
    gridButton: document.getElementById( "show_grid" ),
    listButton: document.getElementById( "show_list" ),
    grid: document.getElementById("grid_view"),
    list: document.getElementById("list_view"),
    searchElem: document.getElementById( "mob_search" )
  }

  var employeeId = 0;

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
    this.empList = {};
    this.matchedResult = [];

    this.isUnique = function (attr, value) {
      var objectKeys = Object.keys(this.empList);
      var length = objectKeys.length;
      while (length--) {
        if (this.empList[objectKeys[length]][attr] == value) return false
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
        var employeeIdCollection = Object.keys(system.empList);
        var length = employeeIdCollection.length;
        while (length--) {
          if (str && system.empList[employeeIdCollection[length]].mobile.match(regex)) {
            empId = employeeIdCollection[length];
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
      if (this.defaultView == "grid_view") {
        page.grid.classList.remove( "hidden" );
        page.gridButton.classList.add( "selected" );
      }else if (this.defaultView == "list_view") {
        page.list.classList.remove( "hidden" );
        page.listButton.classList.add( "selected" );
      }
    }

    this.displayDefaultView();

    this.showGridView = function() {
      page.gridButton.addEventListener("click", function() {
        page.gridButton.classList.add( 'selected' );
        page.listButton.classList.remove( "selected" );
        page.grid.classList.remove( "hidden" );
        page.list.classList.add( "hidden" );
        this.currentView = "grid_view";
      }.bind(this))
    }

    this.showListView = function() {
      page.listButton.addEventListener("click", function() {
        page.gridButton.classList.remove( 'selected' );
        page.listButton.classList.add( "selected" );
        page.grid.classList.add( "hidden" );
        page.list.classList.remove( "hidden" );
        this.currentView = "list_view";
      }.bind(this));
    }
    this.showListView();
    this.showGridView();

    this.startManaging = function () {
      //Create employee on click on save button
      page.saveButton.addEventListener("click", function(e) {
        // console.log(this.empList.length);
        e.preventDefault();
        console.log(this.isValidEmployeeDetails());
        if (this.isValidEmployeeDetails()) {
          var employee = new Employee(employeeId++);
          this.empList[employee.uniqueId] = employee;
          document.getElementById("display_employee").classList.remove("hidden");
          this.appendEmployeeGridView(employee);
          this.appendEmployeeListView(employee);
        }
      }.bind(this))
    }

    this.removeRecords = function (employee) {
      delete this.empList[employee.uniqueId];
      var recordsToRemove = document.getElementsByClassName(employee.uniqueId);
      var length = recordsToRemove.length, record = "";
      while (length--) {
        record = recordsToRemove[0];
        record.parentNode.removeChild(record)
      }
      if (!Object.keys(this.empList).length) document.getElementById("display_employee").classList.add("hidden");
    }

    this.appendEmployeeListView = function (employee) {
      var displayListElem = document.getElementById("list_template").cloneNode(true);
      displayListElem.classList.remove("hidden");
      displayListElem.classList.add(employee.uniqueId);
      var details = displayListElem.getElementsByClassName("list_emp_detail");
      details[0].appendChild(document.createTextNode(employee.name));
      details[1].appendChild(document.createTextNode(employee.email))
      details[2].appendChild(document.createTextNode(employee.mobile));
      var removeLink = displayListElem.getElementsByClassName("remove_list_record")[0];
      document.getElementById( "list_table" ).appendChild(displayListElem);
      removeLink.addEventListener("click", function(e) {
        e.preventDefault();
        if( confirm("This record will be deleted permanently. Are you sure want to remove it.")) {
          this.removeRecords(employee);
        }
      }.bind(this));
    }

    this.appendEmployeeGridView = function(employee) {
      var displayGridElem = document.getElementById("grid_template").cloneNode(true);
      displayGridElem.classList.remove("hidden");
      displayGridElem.classList.add(employee.uniqueId);
      var removeButton = displayGridElem.getElementsByClassName("remove_grid")[0];
      removeButton.appendChild(document.createTextNode("D"));
      var pElement = displayGridElem.getElementsByClassName("grid_emp_detail");
      pElement[0].appendChild(document.createTextNode("Name :  "+employee.name+""));
      pElement[1].appendChild(document.createTextNode("Email :  "+employee.email+""));
      pElement[2].appendChild(document.createTextNode("Mobile :  "+employee.mobile+""));

      removeButton.addEventListener("click", function() {
        if (confirm("This record will be deleted permanently. Are you sure want to remove it.")) {
          this.removeRecords(employee);
        }
      }.bind(this));
      page.grid.appendChild(displayGridElem);
    }
  }

  (function startManagingEmployee() {
    var system = new EmployeeManageSystem();
    system.startManaging();
  })();
})