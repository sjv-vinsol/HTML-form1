animal = 'cat'

animal.instance_eval do
  # This method is added to singleton class of animal object
  def speak
    puts 'meow in instance eval'
  end
end

String.class_eval do
  def speak
    puts 'meow in class_eval'
  end
end

String.instance_eval do
  def speak
    puts 'meow in instance_eval of string'
  end
end

String.speak

puts animal.upcase
animal.speak


# class Test
  
# end

# # class_eval declares instance method and instance_eval declares class methods.
# # This is confusing but has to be remembered.
# Test.instance_eval do
#   def m1
#     puts 'This is testing'
#     puts 'Hello there!!!'
#   end
# end

# t = Test.new 
# # t.m1
# Test.m1