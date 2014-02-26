class String
  def count_chars_by_type
    count = Hash.new(0)
    each_char do |c|
      case c
      when ('0'..'9') then count[:integer] += 1
      when ('A'..'Z') then count[:upper] += 1
      when ('a'..'z') then count[:lower] += 1
      else  count[:special_chars] += 1
      end
    end
    count
  end
end