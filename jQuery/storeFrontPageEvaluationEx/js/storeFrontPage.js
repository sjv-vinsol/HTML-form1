$(document).ready(function() {
  getProductJSON();
})

function initializeStore(productJSON) {
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
  this.availableProducts = [];
  this.showOnlyAvailableProducts = false;

  this.init = function () {
    this.createProducts();
    this.getFilter("brand");
    this.getFilter("color");
    this.getAvailableProducts();
    this.displayFilters();
    this.bindEvents();
  }

  // push all available products to availableProducts array.
  this.getAvailableProducts = function () {
    var products = [], store = this;
    $.each(store.productsCollection, function(i, product) {
      if (product.availability) {
        store.availableProducts.push(product);
      }
    })
  }

  this.bindEvents = function () {
    var store = this;
    $(".filter_options").bind("click", function (e) {
      e.stopPropagation();
      store.filterHandler();
    })
    $(".filter_container").bind("click", function (e) {
      $(this).find("input").click();
    })
    $("#all_products").bind("click", function () {
      store.allProductHandler();
    });
    $("#available_products").bind("click", function () {
      store.availableProductHandler();
    })
    $(".label").bind("click", function () {
      $(this).prev("input").click();
    })
  }

  this.allProductHandler = function () {
    this.showOnlyAvailableProducts = false;
    this.filterHandler();
  }

  this.availableProductHandler = function () {
    this.showOnlyAvailableProducts = true;
    this.filterHandler();
  }

  this.filterHandler = function () {
    var store =  this;
    this.setFilterdProducts();
    var filter = {brand: [], color: []};
    $(".filter_options:checked").each(function() {
      var elem = $(this);
      filter[elem.data("type")].push(elem.val());
    })
    store.displayFilterResults(filter);
  }

  // To show only available products, filteredProducts is set to total products that are available.
  this.setFilterdProducts = function () {
    if (this.showOnlyAvailableProducts) {
      this.filteredProducts = this.availableProducts;
    } else {
      this.filteredProducts = this.productsCollection;
    }
  }

  this.displayFilterResults = function (filter) {
    var store = this;
    $.each(filter, function(type, options) {
      if (options.length) {
        var filterResults = []
        $.each(store.filteredProducts, function (i, product) {
          if ($.inArray(product[type], options) >= 0) {
            filterResults.push(product);
          }
        })
        store.filteredProducts = filterResults;
      }
    })
    this.displayProducts();
  }

  this.displayFilters  = function () {
    this.displayBrandFilterOptions();
    this.displayColorFilterOptions();
  }

  this.displayBrandFilterOptions = function () {
    var brandHash = { attrArray: this.brands.sort()};
    $("#filter_li_template")
      .tmpl(brandHash).appendTo("#brand_container")
      .find("input").data("type", "brand");
  }

  this.displayColorFilterOptions = function () {
    var colorHash = { attrArray: this.colors.sort()};
    $("#filter_li_template").tmpl(colorHash).appendTo("#color_container")
      .find("input").data("type", "color");
  }

  this.createProducts = function () {
    var store = this;
    $.each(productJSON, function(i, product) {
      var product = new Product(product.name, product.url, product.color, product.brand, product.sold_out);
      store.productsCollection.push(product);
    })
    this.filteredProducts = this.productsCollection;
    this.displayProducts();
  }

  this.displayProducts = function () {
    this.clearProductContainer();
    $.each(this.filteredProducts, function (i, product) {
      $("<img/>", {class: "product"}).attr("src", product.url).appendTo("#product_container");
    })
  }

  this.clearProductContainer = function () {
    $("#product_container").text("");
  }

  this.getFilter = function (attr) {
    var store = this;
    $.each(productJSON, function(i,product) {
      if ($.inArray(product[attr], store[attr + "s"]) < 0) {
        store[attr + "s"].push(product[attr]);
      }
    })
  }
}