require_relative '../lib/time'
require_relative '../lib/string'

time = []
2.times do |i|
  begin
    p "Enter valid time #{i} in (h:m:s)"
    time[i] = gets.chomp
  end while !time[i].valid_time?
end

p Time.add_time(time[0],time[1])