def fibinacci
  fib = []
  continue = true
  while continue
    if fib.empty?
      fib << 0
      fib << 1
    else
      continue = yield(fib)
    end
  end
  p fib.join(",")
end

fibinacci do |fib|
  index_of_last_element = fib.length - 1
  sum_of_last_two_elements = fib[index_of_last_element] + fib[index_of_last_element-1]
  if sum_of_last_two_elements < 1000
    fib << sum_of_last_two_elements
  else
    false
  end
end