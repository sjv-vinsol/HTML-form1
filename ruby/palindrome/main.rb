# require '/home/ashutosh/work/Learning/ruby.palindrome/palindrome'
require_relative 'palindrome'

p "Enter a string"
str = gets.chomp.downcase

if str == 'q'
  p "Good Bye!!!"
  exit()
else
  p str.is_palindrome
end