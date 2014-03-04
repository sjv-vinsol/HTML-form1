require_relative '../lib/array'

class Integer
  class NegativeNumber < StandardError; end
  
  def negative?
    self < 0
  end

  def get_fibonacci
    if negative?
      raise NegativeNumber, 'Provide a positive number'
    elsif zero?
      [0]
    else
      fibonacci_series = [0, 1, 1]
      increment_fibonacci_series(fibonacci_series) do |sum|
        fibonacci_series << sum if (sum <= self)
      end
      fibonacci_series
    end
  end

  private

  def increment_fibonacci_series(fibonacci_series)
    begin
      sum = fibonacci_series.last + fibonacci_series.second_last
    end while yield(sum)
  end
end