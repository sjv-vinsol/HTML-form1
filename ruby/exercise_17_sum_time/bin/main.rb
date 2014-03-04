require_relative '../lib/time'

print 'Please enter time1(hh:mm:ss): '
input_time1 = Time.get_and_validate
print 'Please enter time2(hh:mm:ss): '
input_time2 = Time.get_and_validate

puts Time.add(input_time1,input_time2).humanize