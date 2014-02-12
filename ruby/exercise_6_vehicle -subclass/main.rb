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

class Bike < Vehicle
  attr_reader :dealer
  def initialize(price, name, dealer)
    super(price, name)
    @dealer = dealer
  end

  def details
    super + ", Dealer: #{@dealer}"
  end
end

bike = Bike.new(2000, "buzz", "Uday")

p bike.details
bike.price = 1000
p bike.price