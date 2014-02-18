class Array
  def group_by_length
    hash = {}
    for val in self
      length = val.length
      hash.has_key?(length) ? (hash[length] << val) : (hash[length] = [val])
    end
    hash
  end
end