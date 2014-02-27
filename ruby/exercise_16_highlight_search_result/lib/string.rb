class String
  def highlight_and_count_word(pattern)
    no_of_occurences = 0
    highlighted_string = gsub(pattern) do |match|
      no_of_occurences += 1
      "(#{match})"
    end
    { highlighted_string: highlighted_string, total_occurences: no_of_occurences }
  end
end