require_relative '../lib/dictionary'

print 'No of Options:'
no_of_options = gets.chomp.to_i

print 'wring word:'
wrong_word = gets.chomp

options = []
puts 'Options'
no_of_options.times do |count|
  options << gets.chomp
end

dict = Dictionary.new
puts dict.words_with_longest_common_sequence(options, wrong_word).join(', ')