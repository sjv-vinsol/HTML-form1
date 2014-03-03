require_relative '../lib/array'

class Integer
  def negative?
    self < 0
  end

  def get_fibonacci
    if negative?
      raise 'InvalidNumber'
    elsif zero?
      return [0]
    else
      fibonacci_series = [0, 1, 1]
    end
    increment_fibonacci_series(fibonacci_series) do |sum|
      fibonacci_series << sum if (sum <= self)
    end
    fibonacci_series
  end

  private

  def increment_fibonacci_series(fibonacci_series)
    begin
      sum = fibonacci_series.last + fibonacci_series.second_last
    end while yield(sum)
  end
end