class Integer
  def to_s
    # puts '@@@@@@@@@@@@'
    "Count is #{self}"
  end
end

class Alien
  @count = 4
  class << self
    define_method('count') do
      @count
    end

    define_method('count=') do |count|
      @count = count
    end
  end

end


# module Behaviour
#   def speak
#     puts 'meaow'
#   end
# end

# class Animal
#   # extend Behaviour
#   class << self
#     include Behaviour
#   end
#   def initialize(name)
#     @name = name
#   end
# end

# cat = Animal.new('cat')
# Animal.speak

