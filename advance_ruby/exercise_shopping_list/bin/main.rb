require_relative '../lib/shopping_list'

shopping_list = ShoppingList.new
shopping_list.items do
  add('Toothpaste', 2)
  add('Computer', 1)
  add('Laptop', 8)
  add('Mobile', 5)
end

shopping_list.show