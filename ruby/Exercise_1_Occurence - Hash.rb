char_count = {}
str = "Hello!! Have a nice day"

#Loop through char_count and update character count if already added. Else add a new one.
def add_or_update_char_count(char, char_count)
  if char_count.has_key?(char)
    char_count[char] = char_count[char] + 1
  else
    char_count[char] = 1
  end
end

# returns 0 if char is a alphabet else nil
def is_char(char)
  /[A-z]/ =~ char
end

# Loop through each character of a string.
str.each_char do |char|
  add_or_update_char_count(char, char_count) if is_char(char)
end

p char_count