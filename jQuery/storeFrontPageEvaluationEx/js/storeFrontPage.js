$(document).ready(function() {
	var store = new Store();
	store.init();
})

var productJSON = [
	{"name":"1","url":"1.jpg", "color":"Yellow","brand":"BRAND A","sold_out":"1"},
	{"name":"2","url":"2.jpg","color":"Red","brand":"BRAND B","sold_out":"0"},
	{"name":"3","url":"3.jpg","color":"Green","brand":"BRAND D","sold_out":"0"},
	{"name":"4","url":"4.jpg","color":"Red","brand":"BRAND A","sold_out":"1"},
	{"name":"5","url":"5.jpg","color":"Blue","brand":"BRAND B","sold_out":"0"},
	{"name":"6","url":"6.jpg","color":"Green","brand":"BRAND C","sold_out":"0"},
	{"name":"7","url":"7.jpg","color":"Red","brand":"BRAND C","sold_out":"1"},
	{"name":"8","url":"8.jpg","color":"Blue","brand":"BRAND D","sold_out":"0"},
	{"name":"9","url":"9.jpg","color":"Yellow","brand":"BRAND A","sold_out":"0"},
	{"name":"10","url":"10.jpg","color":"Yellow","brand":"BRAND B","sold_out":"1"},
	{"name":"11","url":"11.jpg","color":"Green","brand":"BRAND D","sold_out":"0"},
	{"name":"12","url":"12.jpg","color":"Yellow","brand":"BRAND D","sold_out":"0"},
	{"name":"13","url":"13.jpg","color":"Blue","brand":"BRAND A","sold_out":"0"},
	{"name":"14","url":"14.jpg","color":"Blue","brand":"BRAND D","sold_out":"0"},
	{"name":"15","url":"15.jpg","color":"Green","brand":"BRAND B","sold_out":"0"},
	{"name":"16","url":"16.jpg","color":"Yellow","brand":"BRAND B","sold_out":"1"},
	{"name":"17","url":"17.jpg","color":"Green","brand":"BRAND A","sold_out":"1"},
	{"name":"18","url":"18.jpg","color":"Blue","brand":"BRAND D","sold_out":"1"},
	{"name":"19","url":"19.jpg","color":"Green","brand":"BRAND C","sold_out":"0"},
	{"name":"20","url":"20.jpg","color":"Yellow","brand":"BRAND A","sold_out":"0"}]

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

	this.bindEvents = function () {
		var store = this;
		$(".filter_options").bind("click", function () {
			store.filterHandler();
		})
		console.log($("#all_products"))
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
		store.filterResults(filter);
	}

	this.filterResults = function (filter) {
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
		var brandHash = { attrArray: this.brands};
		$("#filter_li_template").tmpl(brandHash).appendTo("#brand_container").data("type", "brand");
	}

	this.displayColorFilterOptions = function () {
		var colorHash = { attrArray: this.colors};
		$("#filter_li_template").tmpl(colorHash).appendTo("#color_container").data("type", "color");
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
			$("#product_template").clone().attr("src", product.url).removeClass("hidden").appendTo("#product_container");
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