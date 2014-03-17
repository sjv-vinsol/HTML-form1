class Product
  @@id = 0
  attr_accessor :name, :quantity, :id

  def initialize(name, quantity)
    @id = (@@id += 1)
    @name = name
    @quantity = quantity
  end
end