fib = []

def fibonacci(fib)
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

# Pass a block of code to fibonacci that push the sum of last two numbers, if less than 1000, to fib array.
fibonacci(fib) do |fib|
  index_of_last_element = fib.length - 1
  sum_of_last_two_elements = fib[index_of_last_element] + fib[index_of_last_element-1]
  if sum_of_last_two_elements < 1000
    fib << sum_of_last_two_elements
  else
    false
  end
end

p fib.join(",")