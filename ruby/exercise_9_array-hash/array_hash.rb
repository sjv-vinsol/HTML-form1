class Array
  def array_to_hash
    hash = {}
    for val in self
      length = val.length
      hash.has_key?(length) ? (hash[length] << val) : (hash[length] = [val])
    end
    hash
  end
end