require_relative '../lib/interest'

print 'Enter principal: '
principal = gets.chomp.to_f

print 'Enter time: '
time = gets.chomp.to_f

interest = Interest.new { [principal, time] }
puts interest