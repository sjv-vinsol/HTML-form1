# p = proc { |x, y| x + 4; return; }
# puts p.call(4)

# l = lambda { |a| a + 1; return; }
# puts l.call(4)

# def test(b, x)
#   puts 'Start of method'
#   if x == 1
#     puts 'Inside Method'
#     b.call(3)
#     # return
#   end
#   puts 'End of method'
# end

# test(p, 1)

# def count_with_increment(start, inc)
#   start -= inc
#   lambda { start += inc }
# end

# counter = count_with_increment(10, 3)

# puts counter.call
# puts counter.call
# puts counter.call

class Klass
  @@a = 4
  @@b = 5
  def one
    result = @@a + @@b
    puts 'Expensive call'
    # @val = result
    def one
      puts 'Simple call'
      @val
    end
    @val = result
  end
end

ex = Klass.new
puts ex.one
puts ex.one
puts ex.one



