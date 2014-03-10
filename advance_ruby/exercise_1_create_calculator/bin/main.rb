require_relative '../lib/calculator'

calculator = Calculator.new
puts calculator.calculate(4, :+, 4)
puts calculator.calculate(4, :*, 4)
puts calculator.calculate(4, :-, 4)
puts calculator.calculate(4, :/, 4)