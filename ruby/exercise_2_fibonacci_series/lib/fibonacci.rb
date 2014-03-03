class Integer
  def get_fibonacci
    fib_series = []
    case self
    when 0
      fib_series << 0
      return fib_series
    else 
      fib_series.push(0, 1)
    end
    extend_fib_series(fib_series) do |sum|
      fib_series << sum if (sum <= self)
    end
    fib_series.join(", ")
  end

  private

  def extend_fib_series(fib_series)
    begin
      last_element_index = fib_series.length - 1
      sum = fib_series[last_element_index] + fib_series[last_element_index - 1]
    end while yield(sum)
  end
end