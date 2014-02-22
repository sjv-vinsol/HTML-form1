require 'prime'

class Integer
  def prime_numbers
    prime_no = [(2 if self >= 2)]
    (3..self).step(2) do |number|
      prime_no << number if Prime.prime?(number)
    end
    prime_no
  end
end