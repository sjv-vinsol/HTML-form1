class Integer
  def factorial
    (self > 0) ? (1..self).reduce(:*) : 1
  end
end