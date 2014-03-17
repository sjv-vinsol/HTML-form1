def method1
  puts 'This is testing proc'
  Proc.new do |a, b|
    while b < 1
      puts 'World is never the same before!!'
      a * b
      b -= 1
    end
  end
end

method1.call(2,6)