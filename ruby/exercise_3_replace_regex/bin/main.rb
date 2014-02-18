require_relative "../lib/string"

p "Enter a string"
regex = /[aeiou]/
p gets.chomp.replace_pattern(regex, "*")