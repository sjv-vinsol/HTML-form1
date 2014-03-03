require_relative 'integer'

class Factorial
  class NegativeNumberError < StandardError; end
  class NotaNumberError     < StandardError; end

  attr_reader :factorial
  
  def initialize(number)
    begin
      if is_not_fixnum(number)
        raise NotaNumberError.new('Provide a integer.')
      elsif number.negative?
        raise NegativeNumberError.new('Provide number greater than or equal to 0')
      else
        @factorial = 1
        (1..number).each { |element| @factorial *= element }
      end
    rescue StandardError => e
      puts "#{e.class}: #{e.backtrace}"
    end
  end

  def is_not_fixnum(number)
    number.class != Fixnum
  end  

  def to_s
    @factorial ? "Factorial is: #{factorial}" : ''
  end
end