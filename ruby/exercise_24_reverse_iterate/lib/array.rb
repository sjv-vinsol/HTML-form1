class Array
  def reverse_iterate
    length = self.length
    while (length -= 1) >= 0
      yield self[length]
    end
  end
end