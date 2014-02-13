require_relative "../lib/sring"

p "Enter a string"
regex = /[aeiou]/
p gets.chomp.replace_string(regex, "*")