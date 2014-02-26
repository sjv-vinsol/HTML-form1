class Integer
  class NegativeNumberError < StandardError; end
  
  def factorial
    begin
      if (self >= 0) 
        (1..self).inject(1) { |result, element| result * element }
      else
        raise NegativeNumberError.new('Factorial of negative numbers does not exist')
      end
    rescue NegativeNumberError => e
      puts "#{e.class}: #{e.message}"
    end
  end
end