#Protected methods cannot be called outside its class. It can be called on object.
#Private method is same as protected method, diff is that private method cannot be called on explicit
# ...object. Rather they can be called implicitely.
# Private and protected methods both are inherited.
class Test1
	
	def initialize(name, age)
		@name = name
		@age = age
	end
	

	def say_name
		p @name
	end

	def say_age
		p @age
	end

	def input_age
		self.say_age
	end


	private :say_name, :say_age
	public :input_age

end

class Person < Test1
	def initialize(name, age)
		@name = name
		@age = age
	end

	def puts_age
		self.say_age
	end
end

# a = Test1.new("rohit", 40)
# a.input_age
# a = Person.new("sanjeev", 23)
# a.puts_age

x = "test"
y = x
x[0] = "J"
p y
p x