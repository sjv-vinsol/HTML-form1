class String
  def highlight_and_return_total_occurence(pattern)
    no_of_occurences = 0
    { modified_string: gsub(pattern) do |match|
      no_of_occurences += 1
      "(#{match})"
    end,
    total_occurences: no_of_occurences }
  end
end