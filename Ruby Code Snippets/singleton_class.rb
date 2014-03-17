# class Test
#   @here = 'Test vatiable'
#   @name1 = 'This is for test'


#   class << self
#     attr_accessor :name1

#     # def name
#     #   puts self
#     #   @name
#     # end

#     # def name=(name)
#     #   @name = name
#     # end
#   end

#   def abc
    
#   end

# end

# Test.name1 = 'Sanjeev'
# puts Test.name1


class String
  def *(str)
    self + str.upcase
  end
end

# puts 'Hello '.send(:*, 'World')

def calc(a, s, b)
  a.send(s, b.to_f).round(2)
end

puts calc(28, :/, 7)