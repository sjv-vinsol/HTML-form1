p "Enter a string"
regex = /[aeiou]/
str = gets.chomp

def replace_string_with(str, regex, replace_by)
  str.gsub(regex, replace_by)
end

p replace_string_with(str, regex, "*")