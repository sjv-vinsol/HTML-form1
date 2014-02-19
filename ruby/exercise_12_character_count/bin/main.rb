require_relative '../lib/string'

begin
  p 'Enter a string'
  input_string = gets.chomp
end while input_string.empty?

p input_string.count_by_type