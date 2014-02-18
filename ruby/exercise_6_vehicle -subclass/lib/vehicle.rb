class Vehicle
  attr_accessor :price
  attr_reader :name
  
  def initialize(price, name)
    @price = price
    @name = name
  end

  def details
    "Name : #{@name}, Price: #{@price}"
  end
end