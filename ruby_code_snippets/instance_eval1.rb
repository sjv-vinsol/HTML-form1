class Turtle
  def initialize
    @path = []
  end

  def right(n)
    @path << 'r' * n
  end

  def left(n)
    @path << 'l' * n
  end

  def up(n)
    @path << 'u' * n
  end

  def path
    @path.join
  end

  def move(&block)
    instance_eval(&block)
    # yield(self)
  end

end

t = Turtle.new
t.move do
  right(3)
  left(5)
  up(2)
  right(1)
end
puts t.path

# t.right(3)
# t.left(2)
# puts t.path