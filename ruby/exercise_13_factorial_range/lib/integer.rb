class Integer
  def factorial
    (1..self).inject(1) { |r, e| r * e }
  end
end