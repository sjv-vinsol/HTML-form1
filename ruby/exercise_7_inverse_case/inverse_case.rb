class String 
  def is_upper?
    self == self.upcase
  end

  def to_s
    arr = []
    self.each_char do |c|
      c.is_upper? ? arr << c.downcase : arr << c.upcase
    end
    arr.join()
  end
end