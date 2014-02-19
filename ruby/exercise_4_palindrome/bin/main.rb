require_relative '../lib/string'

p 'Enter a string'
begin 
  input_string = gets.chomp.downcase
end while input_string.empty?

if input_string == 'q'
  p 'Good Bye!!!'
  exit()
else
  p (input_string.palindrome?) ? 'String is palindrome' : 'String is not a palindrome'
end