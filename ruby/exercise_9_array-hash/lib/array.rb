class Array
  def group_by_length
    hash = Hash.new { |h,k| h[k] = Array.new }
    for val in self
      hash[val.to_s.length] << val
    end
    hash
  end
end