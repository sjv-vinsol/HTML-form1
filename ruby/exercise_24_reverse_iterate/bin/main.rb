require_relative '../lib/array'

[2, 3, 4, 5, 9].reverse_iterate { |i| print "#{i}" }
puts '----------------'