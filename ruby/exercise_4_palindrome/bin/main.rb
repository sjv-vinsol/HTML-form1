require_relative '../lib/string'

puts 'Enter a string'
begin 
  input_string = gets.chomp.downcase
end while input_string.empty?

if input_string == 'q'
  puts 'Good Bye!!!'
  exit()
else
  puts (input_string.palindrome?) ? 'String is palindrome' : 'String is not a palindrome'
end