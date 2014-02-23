require_relative '../lib/string'

highlight_pattern = /can/i
p 'Enter a string'
input_string = gets.chomp
output_hash = input_string.highlight_and_return_total_occurence(highlight_pattern)
p output_hash[:total_occurences]
p output_hash[:modified_string]