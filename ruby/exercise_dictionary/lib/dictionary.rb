class Dictionary
  @@options = Hash.new { |hash, key| hash[key] = [] }

  def words_with_longest_common_sequence(options, wrong_word)
    options.each { |option| collect_by_max_length(wrong_word, option)}
    (@@options.max_by { |key, val| key })[1]
  end

  # collect max length of matched substring.
  # collect in hash with key as max length and value as option.
  def collect_by_max_length(word, option)
    length = word.length
    matched_substrings = get_matched_substrings(word, option)
    max_length_of_matched_substrings = (matched_substrings.sort_by &:length).last.length
    #grouping max length substrings of each option
    @@options[max_length_of_matched_substrings] << option
  end

  # return all the possible common substrings betweend word and option.
  def get_matched_substrings(word, option)
    matched_substrings, length = [], word.length
    (0..(length-1)).each do |start_index|
      (start_index..(length-1)).each do |end_index|
        match = option.match(word[start_index..end_index])
        matched_substrings << match[0] if match
      end
    end
    matched_substrings
  end
end