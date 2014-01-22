$(document).ready(function() {
  getProductJSON();
})

function initializeStore() {
  var store = new Store();
  store.init();
}

function getProductJSON() {
  $.ajax({
    type: 'GET',
    url: "data/product.json",
    dataType: "json",
    success: function (response) {
      productJSON = response
      initializeStore();
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

function Store() {
  this.productsCollection = [];
  this.brands = [];
  this.colors = [];
  this.currentProducts = [];

  this.init = function () {
    this.createProducts();
    this.parseDistinct("brand");
    this.parseDistinct("color");
    this.displayFilters();
    this.bindEvents();
  }

  this.toggleCheckBox = function (checkbox) {
    if (checkbox.prop("checked")) {
      checkbox.prop("checked", false);
    } else {
      checkbox.prop("checked", true);
    }
  }

  this.bindEvents = function () {
    var store = this;
    $(".filter_options_container").bind("click", function (e) {
      store.toggleCheckBox($(this).find("input"));
      store.filterHandler();
    })
    $("#all_products").bind("click", function () {
      store.displayAllProducts();
    });
    $("#available_products").bind("click", function () {
      store.displayAvailableProducts();
    })
  }

  this.displayAllProducts = function () {
    this.currentProducts = this.productsCollection;
    this.displayProducts();
    this.resetCheckboxes();
  }

  this.resetCheckboxes = function () {
    $("#left_container input:checked").prop("checked", false);
  }

  this.displayAvailableProducts = function () {
    this.currentProducts = [], store = this;
    $.each(store.productsCollection, function (i, product) {
      if (product.availability) {
        store.currentProducts.push(product);
      }
    })
    this.displayProducts();
    this.resetCheckboxes();
  }

  this.filterHandler = function () {
    var store =  this;
    this.currentProducts = this.productsCollection;
    var filter = {brand: [], color: []};
    $("#left_container input:checked").each(function() {
      var elem = $(this);
      filter[elem.data("type")].push(elem.val());
    })
    store.displayFilterResults(filter);
  }

  this.displayFilterResults = function (filter) {
    var store = this;
    $.each(filter, function(type, options) {
      if (options.length) {
        var filterResults = []
        $.each(store.currentProducts, function (i, product) {
          if ($.inArray(product[type], options) >= 0) {
            filterResults.push(product);
          }
        })
        store.currentProducts = filterResults;
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
    this.currentProducts = this.productsCollection;
    this.displayProducts();
  }

  this.displayProducts = function () {
    this.cleanProductContainer();
    $.each(this.currentProducts, function (i, product) {
      $("#product_template").clone().attr("src", product.url)
        .removeClass("hidden").appendTo("#product_container");
    })
  }

  this.cleanProductContainer = function () {
    $("#product_container").text("");
  }

  this.parseDistinct = function (attr) {
    var store = this;
    $.each(productJSON, function(i,product) {
      if ($.inArray(product[attr], store[attr + "s"]) < 0) {
        store[attr + "s"].push(product[attr]);
      }
    })
  }
}