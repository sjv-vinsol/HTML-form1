require_relative "vehicle"

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