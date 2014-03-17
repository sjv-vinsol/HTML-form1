class Array
  def inject(init_val = nil)
    result = init_val || self.shift
    self.each do |n|
      result = yield(result, n)
    end
    result
  end
end

x = ['this', 'is', 'fine!']
p x.inject { |result, x| result + ' ' + x }
p x