class Integer
  def factorial
    (1..self).inject(1) { |result, element| result * element }
  end
end