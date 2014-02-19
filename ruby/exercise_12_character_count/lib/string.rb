class String
  def digit?
    (0..9).any? { |int| int.to_s == self }
  end

  def uppercase?
    ('A'..'Z').any? { |char| char == self }
  end

  def downcase?
    ('a'..'z').any? { |char| char == self }
  end

  def count_by_type
    count = { :upper => 0, :lower => 0, :integer => 0, :special_chars => 0 }
    each_char do |c|
      if c.digit?
        count[:integer] += 1
      elsif c.uppercase?
        count[:upper] += 1
      elsif c.downcase?
        count[:lower] += 1
      else
        count[:special_chars] += 1
      end
    end
    count
  end
end