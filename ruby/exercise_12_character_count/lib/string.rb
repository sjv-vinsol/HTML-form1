class String
  def count_by_type
    count = { upper: 0, lower: 0, integer: 0, special_chars: 0 }
    each_char do |c|
      case c
      when (/\d/)
        count[:integer] += 1
      when ('A'..'Z')
        count[:upper] += 1
      when ('a'..'z')
        count[:lower] += 1
      else
        count[:special_chars] += 1
      end
    end
    count
  end
end