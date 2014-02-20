class Pascal
  def pascal(length)
    current_series = [1, 1]
    next_series = []
    i = 0
    begin
      p current_series
      i += 1
      index_of_first_elem = current_series.index(current_series.first)
      index_of_last_elem = current_series.rindex(current_series.last)
      
      current_series.each do |integer, index|
        if (index == index_of_first_elem)
          next_series << integer
          next_series << (current_series[index] + current_series[index - 1])
        elsif (index == index_of_last_elem)
          next_series << integer
        else
          p "m in!!"
          next_series << (current_series[index] + current_series[index - 1])
        end
      end

      current_series = next_series
      next_series = []
      
    end while (i < length)
  end
end

x = Pascal.new
x.pascal(3)