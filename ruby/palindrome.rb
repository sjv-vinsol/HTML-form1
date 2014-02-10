p "Enter a string"
x = gets.chomp
is_palindrome = (x == x.reverse())
if (x == 'q' || x == 'Q')
	p 'Going to exit'
	exit()
elsif (is_palindrome)
	p "Input string is palindrome"
elsif (!is_palindrome)
	p "Input string is not palindrome"
end