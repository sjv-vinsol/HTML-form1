var storeDefaults = {
  storeCounter: 0
}

$(document).ready(function() {
  getProductJSON();
})

function initializeStore(productJSON) {
  var store = new Store(productJSON);
  store.init();
  var store = new Store(productJSON);
  store.init();
  var store = new Store(productJSON);
  store.init();
  var store = new Store(productJSON);
  store.init();
}

function getProductJSON() {
  $.ajax({
    type: 'GET',
    url: "data/product.json",
    dataType: "json",
    success: function (productJSON) {
      initializeStore(productJSON);
    }
  })
}

function Product(name, url, color, brand, sold_out) {
  this.name = name;
  this.brand = brand;
  this.color = color;

  this.getUrl = function () {
    return "images" + "/" + url;
  }

  this.url = this.getUrl;
  
  this.checkAvailability = function () {
    if (sold_out == "1") {
      return false;
    }else return true;
  }
  this.availability = this.checkAvailability();
}

function Store(productJSON) {
  this.productsCollection = [];
  this.brands = [];
  this.colors = [];
  this.filteredProducts = [];
  this.showOnlyAvailableProducts = false;
  this.storeId = "store" + ++storeDefaults.storeCounter;

  this.init = function () {
    this.displayStore();
    this.createProducts();
    this.getFilter("brand");
    this.getFilter("color");
    this.displayFilters();
    this.bindEvents();
  }

  // Clone the store and append it to body
  this.displayStore = function () {
    var storeElem = $("#clone_store").clone().removeClass("noDisplay");
    storeElem.attr("id", this.storeId);
    $("body").append(storeElem);
  }

  this.bindEvents = function () {
    var store = this;
    $(this.getSelector(".filter_options")).bind("click", function () {
      store.filterHandler();
    })
    $(this.getDataAttrSelector("all_products")).bind("click", function () {
      store.allProductHandler();
    });
    $(this.getDataAttrSelector("available_products")).bind("click", function () {
      store.availableProductHandler();
    })
  }

  // return selector within scope of a particular store
  this.getSelector = function (value) {
    return ("#" + this.storeId + " " + value);
  }

  // return selector for data Id within scope of a particular store.
  this.getDataAttrSelector = function (dataId) {
    return ("#" + this.storeId + " " + "*[data-id="+dataId+"]");
  }

  // Handler to handle click event of allProducts button.
  this.allProductHandler = function () {
    this.showOnlyAvailableProducts = false;
    this.filterHandler();
  }

  // Handler to handle click event of "Available Products" button.
  this.availableProductHandler = function () {
    this.showOnlyAvailableProducts = true;
    this.filterHandler();
  }

  // Loop through checked checkboxes to create a filter for filtering products.
  this.filterHandler = function () {
    var store =  this;
    this.filteredProducts = this.productsCollection;
    var filter = {brand: [], color: []};
    $("#" + this.storeId + " " + ".filter_options:checked").each(function() {
      var elem = $(this);
      filter[elem.data("type")].push(elem.val());
    })
    store.filterProducts(filter);
  }

  // Loop through each filter and store the filtered results in store.filteredProducts.
  this.filterProducts = function (filter) {
    var store = this;
    $.each(filter, function(type, options) {
      if (options.length) {
        store.applyFilter(type, options);
      }
    })
    if (this.showOnlyAvailableProducts) {
      this.filterAvailableProducts();
    }
    this.displayProducts();
  }

  // Loop through each filter type and filter the products. For ex, filter = {brand: ["Brand A", "Brand B"]},
  //  , then below code loops through brand and filter the products by type is either "Brand A" OR "Brand B"
  this.applyFilter = function (type, options) {
    var filterResults = [];
    $.each(this.filteredProducts, function (i, product) {
      if ($.inArray(product[type], options) >= 0) {
        filterResults.push(product);
      }
    })
    this.filteredProducts = filterResults;
  }

  // Loop through all the store.filteredProducts and filter available products by checking their availability.
  this.filterAvailableProducts = function () {
    var filterResults = [];
    $.each(this.filteredProducts, function (i, product) {
      if (product.availability) {
        filterResults.push(product);
      }
    })
    this.filteredProducts = filterResults;
  }

  this.displayFilters  = function () {
    this.displayFilterOptions("brand");
    this.displayFilterOptions("color");
  }

  this.displayFilterOptions = function (type) {
    var store = this;
    $.each(this[type + "s"].sort(), function (i, filter) {
      store.appendFilter(type, filter);
    })
  }

  // create and append the filter option in DOM.
  this.appendFilter = function (type, filter) {
    var filterElem = $("<label> <input type='checkbox' class='filter_options'>"+filter+"</label>");
    filterElem.find("input").data("type", type).attr("value", filter);
    $(this.getDataAttrSelector(type + "_container")).append(filterElem, $("<br>"));
  }

  // Create products and store them in store.productsCollections.
  this.createProducts = function () {
    var store = this;
    $.each(productJSON, function(i, product) {
      var product = new Product(product.name, product.url, product.color, product.brand, product.sold_out);
      store.productsCollection.push(product);
    })
    this.filteredProducts = this.productsCollection;
    this.displayProducts();
  }

  // loop through each store.filteredProducts and append it to DOM.
  this.displayProducts = function () {
    var store = this;
    this.clearProductContainer();
    $.each(this.filteredProducts, function (i, product) {
      $("<img/>", {class: "product"}).attr("src", product.url).appendTo(store.getDataAttrSelector("product_container"));
    })
  }

  // remove all the products from DOM for individual store so as to display products depending upon filter.
  this.clearProductContainer = function () {
    $(this.getDataAttrSelector("product_container")).text("");
  }

  // Filter distinct values of brand and color from productJSON and store them in store.brands and store.colors respectively.
  this.getFilter = function (attr) {
    var store = this;
    $.each(productJSON, function(i,product) {
      if ($.inArray(product[attr], store[attr + "s"]) < 0) {
        store[attr + "s"].push(product[attr]);
      }
    })
  }
}