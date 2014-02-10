$(document).ready(function() {
  getProductJSON();
})

function getProductJSON() {
  $.ajax({
    type: 'GET',
    url: "data/product.json",
    dataType: "json",
    success: function (productJSON) {
      initialize(productJSON);
    }
  })
}

function initialize (productJSON) {
  var store = new Store(productJSON);
  store.init();
}

function Store (productJSON) {
  // stores the types that is to be filtered.
  this.filterBy = ["color", "brand"];
  // selectedFilter holds the currently selected filter json. For eg if user select red, blue and 
  // brand A then selected Filter will contain {color: ["red", "blue"], brand: ["brand A"]}
  this.selectedFilter = {};
  // filters store all the distinct values of all the types mentioned in filterBy array.
  this.filters = {};
  // activeFilters is storing the array of all possible combinations of filter possible.
  this.activeFilters = [];
  // temporary array used to store updated activeFilter.
  this.temp = [];

  this.init = function () {
    this.getFilters();
    this.displayFilters();
    this.displayProducts();
    this.bindEvents();
  }

  this.bindEvents = function () {
    var store = this;
    $(".filter").bind("click", function () {
      store.filterHandler($(this));
    })
  }

  // Find the active filters and Loop throuch each of them to create selectedFilter json
  this.filterHandler = function (filterElem) {
    var store = this, checkedFilters = $("input:checked");
    this.selectedFilter = {};
    $.each(checkedFilters, function (i, product) {
      var product = $(product);
      if(store.typeIsPresentInArray(product)) { 
        store.addFilterToItsType(product);
      }else {
        store.addFilterAndType(product);
      }
    })
    this.createFilter();
  }

  this.addFilterAndType = function (product) {
    this.selectedFilter[product.data("type")] = [product.attr("value")];
  }

  this.addFilterToItsType = function (product) {
    this.selectedFilter[product.data("type")].push(product.attr("value"));
  }
 
  this.typeIsPresentInArray = function (product) {
    return (product.data("type") in this.selectedFilter)
  }

  
  this.createFilter = function () {
    var store = this;
    this.activeFilters = [];
    // this.selectedFilter is something like : {color: ["red", "yellow"], brand: ["brand A", "brand B"]}
    // below code loops throgh the selected filter json. filterArr is ["red", "yellow"], ["brand A", "brand B"]
    $.each(this.selectedFilter, function (type, filterArr) {
      // loop through each value of filter array.
      $.each(filterArr, function (i, filterValue) {
        // tempArr is the exact duplicate of activeFilters
        // activeFilters is storing the array of all possible combinations of filter possible.
        var tempArr = store.copyObjectByValue(store.activeFilters);
        if (store.activeFilters.length) {
          $.each(tempArr, function (i, activefilterArr) {
            
            activefilterArr.push(store.getFilterString());
            // temp is used to store updated active filter.
            store.temp.push(activefilterArr);
          })
        } else {
          store.temp.push([store.getFilterString()]);
        }
      })
      store.activeFilters = [];
      store.activeFilters = store.copyObjectByValue(store.temp);
      store.temp = [];
    })
    this.displayFilterResults();
  }

  // create data string of filter values
  this.getFilterString = function (type, filterValue) {
    return ("data-" + type + "=" + "'"+filterValue+"'");
  }

  this.copyObjectByValue = function (obj) {
    var outObj = [];
    $.each(obj, function (i, filter) {
      var arr = [];
      $.each(filter, function (i, filterValue) {
        arr.push(filterValue);
      })
      outObj.push(arr);
    })
    return outObj;
  }

  this.getSelector = function () {
    var selector = "";
    $.each(this.activeFilters, function (i, filters) {
      selector += ",img";
      $.each(filters, function (i, filter) {
        selector += "[" + filter + "]";
      })
    })
    // substring function is used to remove the first character of a string
    return(selector.substring(1, selector.length));
  }

  // show Or hide product depending upon filter selected.
  this.displayFilterResults = function () {
    var selector = this.getSelector();
    if (selector) {
      $(".product").hide();
      $(selector).show()
    } else {
      $(".product").show();
    }
  }

  // display all products
  this.displayProducts = function () {
    var store = this;
    var productsCollection = $("<div/>", {id: "products_collection"});
    $.each(productJSON, function (i, product) {
      store.createAndAppendProduct(product, i, productsCollection);
    })
    $("#right_container").append(productsCollection);
  }

  // append product to product collection div....
  this.createAndAppendProduct = function (product, i, productsCollection) {
    var productElem = $("<img/>", {id: i + 1, class: "product", src: "images/" + product.url});
    this.addDataAttributes(productElem, product);
    productsCollection.append(productElem);
  }

  // product is json object and productElem is dom object.
  // add data-color, data-brand and other mentioned filter data to each productElem.
  this.addDataAttributes = function (productElem, product) {
    $.each(this.filterBy, function(i, type) {
      var key = "data-" + type;
      productElem.attr(key, product[type]);
    })
  }

  // collect distinct values of each type.
  this.getFilters = function () {
    var store = this;
    $.each(this.filterBy, function (i, type) {
      var tempTypeCollection = [];
      $.each(productJSON, function (i, product) {
        if ($.inArray(product[type], tempTypeCollection) < 0) {
          tempTypeCollection.push(product[type]);
        }
      })
      store.filters[type] = tempTypeCollection.sort();
    })
  }

  // display filter checkboxes on left
  this.displayFilters = function () {
    var store = this;
    var container = $("#left_container");
    $.each(store.filters, function (type, filter) {
      var filterContainer = $("<div/>", {id: type, class: "type", text: type.toUpperCase() + "S"});
      $.each(filter, function(i, filterValue) {
        store.appendFilterOptions(filterValue, filterContainer, type)
      })
      container.append(filterContainer);
    })
  }

  this.appendFilterOptions = function (filterValue, filterContainer, type) {
    var filterElem = $("<label> <input type='checkbox' class='filter'> "+filterValue+" </input> </label>");
    filterElem.find("input").attr({value: filterValue, "data-type": type});
    filterContainer.append(filterElem);
  }
}