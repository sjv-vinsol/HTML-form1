# INHERITED$$$$$$$$$$$$$$$$$$$$$$$$$$$

# class Parent
#   def self.inherited(klass)
#     puts "#{self} is inherited by #{klass}"
#   end

# end

# class Child < Parent
# end

# class OtherChild < Parent
# end

#------------------------------------------------------------------------------------------------------

# Customer = Struct.new(:name, :age)  do
#   def greeting
#     "Hello #{name}"
#   end
# end

# puts Customer.new('sanjeev', 23).greeting
#------------------------------------------------------------------------------------------------------
class Struct
  @children = []
  class << self
    attr_accessor :children
    def inherited(klass)
      @children << klass
    end
  end

  # def self.children
  #   @children
  # end
end

Dave = Struct.new(:name)
Ted = Struct.new(:age)
p Struct.children
#------------------------------------------------------------------------------------------------------

# CONST_MISSING $$$$$$$$$$$$$$$$$$$$$$$$$$$$