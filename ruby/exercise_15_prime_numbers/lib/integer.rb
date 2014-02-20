class Integer
  def prime_numbers
    prime_no = [(2 if self >= 2)]
    (3..self).step(2) do |number|
      prime = true
      (2..(number/2)).step do |devisor|
          prime = false if number % devisor == 0
      end
      prime_no << number if prime
    end
    prime_no
  end
end