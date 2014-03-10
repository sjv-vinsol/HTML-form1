class Calculator
  def calculate(num1, operator, num2)
    num1.send(operator, num2.to_f).round(2)
  end
end