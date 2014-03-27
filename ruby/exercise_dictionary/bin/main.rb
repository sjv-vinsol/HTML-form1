require_relative '../lib/dictionary'

print 'No of Options:'
no_of_options = gets.chomp.to_i

print 'wring word:'
wrong_word = gets.chomp

words = []
puts 'Options'
no_of_options.times do |count|
  words << gets.chomp
end

dict = Dictionary.new(words, wrong_word)
puts dict.words_with_longest_common_sequence.join(', ')