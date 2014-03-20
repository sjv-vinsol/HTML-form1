class Test
  attr_reader :name, :price
  def initialize(name, price)
    @name = name
    @price = price
  end

  # def name
  #   @name
  # end

  # def name=(name)
  #   @name = name
  # end


end

t = Test.new("sjb", 2333)

p t.name

# t.name = "test"

p t.name
p t.price

