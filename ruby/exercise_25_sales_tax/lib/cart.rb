require_relative 'product'
require_relative 'prompt_and_validate'

class Cart
  include PromptAndValidate
  attr_accessor :current_product
  attr_reader :products

  def initialize
    @products = []
    @total = 0
  end

  def add_product
    @products << (@current_product = Product.new)
    current_product.evaluate_price
    update_total
    add_more_product? ? add_product : display_products
  end

  def update_total
    @total += @current_product.price
  end

  def add_more_product?
    continue = get_and_validate('Do you want to add more items to your list(y/n): ')
    (continue == 'y') ? true : false
  end

  def display_products
    @products.each do |product|
      puts '-------------------------'
      puts "Product Name: #{product.name}"
      puts "Master Price: #{product.master_price}"
      puts "Tax: #{product.tax}"
      puts "Price: #{product.price}"
      puts '-------------------------'
    end
    puts ' '
    puts "GRAND TOTAL: #{@total}"
  end
end