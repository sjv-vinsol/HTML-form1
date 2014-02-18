require_relative '../lib/string'

p "Enter a string"
str = gets.chomp.downcase

while str.empty?
  p "Please enter a valid string"
  str = gets.chomp.downcase
end

if str == 'q'
  p "Good Bye!!!"
  exit()
else
  p (str.palindrome?) ? "String is palindrome" : "String is not a palindrome"
end