class Dictionary

  attr_accessor :wrong_word, :words
  def initialize(words, wrong_word)
    @words = words
    @wrong_word = wrong_word
    @max_length_of_matched_substr = Hash.new { |hash, key| hash[key] = [] }
  end

  # collect max length of matched substring.
  # collect in hash with key as max length and value as option.
  def words_with_longest_common_sequence
    words.each do |word|
      matched_substrings = get_matched_substrings(word)
      # grouping max length substrings of each option
      @max_length_of_matched_substr[matched_substrings.max_by(&:length).length] << word
    end
    @max_length_of_matched_substr[@max_length_of_matched_substr.keys.max]
  end

  private
    
    # return all the possible common substrings betweend word and option.
    def get_matched_substrings(word)
      matched_substrings, length = [], wrong_word.length
      (0...length).each do |start_index|
        (start_index...length).each do |end_index|
          match = word.match(wrong_word[start_index..end_index])
          matched_substrings << match[0] if match
        end
      end
      matched_substrings
    end
end