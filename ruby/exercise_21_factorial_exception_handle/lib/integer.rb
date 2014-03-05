class Integer
  def negative?
    self < 0
  end

  def factorial
    factorial = 1
    (1..self).reduce(:*)
  end
end