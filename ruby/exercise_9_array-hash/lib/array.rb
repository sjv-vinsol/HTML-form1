class Array
  def group_by_length
    hash = Hash.new { |h,k| h[k] = Array.new }
    self.map {|val| hash[val.length] << val }
    hash
  end
end