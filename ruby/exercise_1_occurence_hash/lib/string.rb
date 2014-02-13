class String
  def is_char?
    /[A-z]/ =~ self
  end

  def count_char(str)
    char_count = Hash.new(0)
    str.each_char do |char|
      char_count[char] += 1 if char.is_char?
    end
    char_count
  end
end