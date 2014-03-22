class Test
  @a = "1"
  @@b = "2"

  def self.a
    @a
  end

  def self.b
    @@b
  end
end

class T < Test
  def self.ta
    @a
  end
end

# p Test.a
# p Test.b

p T.ta