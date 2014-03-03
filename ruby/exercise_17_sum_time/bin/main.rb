require_relative '../lib/time'

print 'Please enter time1(hh:mm:ss): '
input_user_time1 = Time.get_and_validate
print 'Please enter time2(hh:mm:ss): '
input_user_time2 = Time.get_and_validate

time = Time.add_time(input_user_time1,input_user_time2)
puts Time.humanize(time)