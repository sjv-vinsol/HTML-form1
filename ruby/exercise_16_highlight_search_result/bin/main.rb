require_relative '../lib/string'

highlight_pattern = /can/i
puts 'Enter a string'
input_string = gets.chomp
output_hash = input_string.highlight_and_count_word(highlight_pattern)
puts output_hash[:highlighted_string]
puts "Total occurence of 'can': #{output_hash[:total_occurences]}"