cat = 'cat'
def cat.speak
  puts 'meaow'
end

dog = 'dog'
class << dog
  def bark
    puts 'Bhooo Bhooo'
  end
end

cat.speak
dog.bark

cat.bark
dog.speak