class String 
  def upper?
    self == self.upcase
  end

  def inverse_case
    arr = []
    self.each_char do |c|
      c.upper? ? arr << c.downcase : arr << c.upcase
    end
    arr.join()
  end
end