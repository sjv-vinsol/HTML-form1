# dynamicly create mehtod using define_method approach

class Multiplier

  def self.create_multiplier(n)
    define_method("times_#{n}") do |val|
      val * n
    end
  end

  11.times { |i| create_multiplier(i) }
end

m = Multiplier.new

puts m.times_10(6)