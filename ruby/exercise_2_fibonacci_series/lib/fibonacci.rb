class Fibonacci
  def get_fibonacci_upto(max_digit)
    fib = []
    add_elements(fib) do |fib|
      index_of_last_element = fib.length - 1
      sum_of_last_two_elements = fib[index_of_last_element] + fib[index_of_last_element-1]
      if sum_of_last_two_elements < max_digit
        fib << sum_of_last_two_elements
      else
        false
      end
    end
    fib.join(",")
  end

  private
  def add_elements(fib)
    continue = true
    while continue
      if fib.empty?
        fib << 0
        fib << 1
      else
        continue = yield(fib)
      end
    end
  end
end