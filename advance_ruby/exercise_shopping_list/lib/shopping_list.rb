require_relative 'product'

class ShoppingList
  def initialize
    @shopping_list = {}
    @item_count = 0
  end

  def items(&block)
    instance_eval(&block)
  end

  def add(name, quantity)
    product = Product.new(name, quantity)
    @shopping_list[product.id] = product
  end

  def show
    puts 'Your Shopping List :'
    @shopping_list.each do |id, product|
      puts '----------------------------'
      puts "Name : #{product.name}"
      puts "Quantity : #{product.quantity}"
    end
    puts '----------------------------'
  end
end