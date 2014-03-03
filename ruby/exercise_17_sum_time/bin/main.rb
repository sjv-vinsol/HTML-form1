require_relative '../lib/time'
require_relative '../lib/string'

time = []
2.times do |i|
  begin
    p "Enter valid time#{i + 1} in (h:m:s)"
    time[i] = gets.chomp
  end while !time[i].valid_time?
end

puts Time.add_time(time[0],time[1])