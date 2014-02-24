class String
  REGEX_VOWEL = /[aeiou]/
  
  def replace_vowel(replace_by='*')
    gsub(REGEX_VOWEL, replace_by)
  end
end