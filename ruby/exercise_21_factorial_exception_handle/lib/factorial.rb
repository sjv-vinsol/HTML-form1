require_relative 'integer'
require_relative 'object'

class Factorial

  attr_reader :factorial
  
  def initialize(number)
    begin
      @factorial = number.validate_and_get_factorial!
    rescue StandardError => e
      puts "#{e.class}: #{e.message}"
    end
  end

  def to_s
    @factorial ? "Factorial is: #{factorial}" : ''
  end
end