class Factorial
  class NegativeNumberError < StandardError; end
  class NotaNumberError < StandardError; end

  def self.fact(number)
    begin
      case
      when number.class != Fixnum
        raise NotaNumberError.new('Provide a integer.')
      when number < 0
        raise NegativeNumberError.new('Provide number greater than or equal to 0')
      else
        result = 1
        (1..number).each { |element| result *= element }
        result
      end
    rescue Exception => e
      puts "#{e.class}: #{e.message}"
    end
  end
end