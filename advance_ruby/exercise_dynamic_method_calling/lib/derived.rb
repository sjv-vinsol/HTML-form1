class Derived < String
  def exclude?(string, substring)
    !string.include?(substring)
  end

  def test(a, b)
    puts 'In Derived Class!!'
    puts a
    puts b
  end
end