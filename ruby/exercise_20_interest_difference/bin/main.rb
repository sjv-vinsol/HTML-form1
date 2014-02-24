require_relative '../lib/interest'

p 'Enter principal'
principal = gets.chomp.to_i

p 'Enter time'
time = gets.chomp.to_i

interest = Interest.new.tap do |new_interest|
  new_interest.principal = principal
  new_interest.time = time
  new_interest.rate = 0.1
end

p "Difference in compound and simple interest over #{time} year(s) : #{interest.diff_in_compound_and_simple}"