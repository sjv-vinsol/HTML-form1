class String
  def get_method_and_params
    split_multiple('(', ',', ')', '\'', '"')
  end

  def split_multiple(*splitters)
    full_split = [self]
    splitters.each do |splitter|
      split = []
      full_split.each do |string|
        string.split(splitter).each { |str| split << str.strip }
      end
      full_split = split
    end
    full_split
  end
end