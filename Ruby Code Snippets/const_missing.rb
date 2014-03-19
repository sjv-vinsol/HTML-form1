#   def const_missing(const)
#     puts "Missing #{const}"
#   end

# asdf

# class Foo
# end
# def Foo.const_missing(name)
#   puts "Name is missing"
#   name # return the constant name as Symbol
# end

# puts Foo::UNDEFINED_CONST


# module Persisteble
#   def self.included(klass)
#     puts "included #{self} into #{klass}"
#   end
# end

# class Person
#   include Persisteble

# end

# class Test
#   include Persisteble


# end

class Person
  @count = 0
  def self.method_added(method)
    @count += 1
    puts "Added method #{method}"
  end

  def self.count_methods
    @count
  end

  def test_method

  end
  def test_mthod

  end
end

puts Person.count_methods




