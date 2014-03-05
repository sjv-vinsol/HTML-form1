class Object
  class NegativeNumberError < StandardError; end
  class DecimalNumberError  < StandardError; end
  class NotANumberError     < StandardError; end

  # validate +ve integer
  def validate_and_get_factorial!
    klass = self.class
    case
    when klass == String then raise NotANumberError.new('Provide an integer.')
    when klass == Float then raise DecimalNumberError.new('Decimal numbers are not allowed')
    when self.negative? then raise NegativeNumberError.new('Provide number greater than or equal to 0')
    else
      factorial
    end
  end
end