# monkey patching is just changing the behaviour of a method in a given existing class.
class Person
	def initialize(name)
		@name = name
	end

	private
	def talk
		p @name
	end
end

class Person
	def talk
		p "Monkey patching"
	end
end

person1 = Person.new("Sanjeev")
person1.talk

