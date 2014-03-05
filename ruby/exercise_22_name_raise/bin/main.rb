require_relative '../lib/name'

user = User.new

puts 'Enter first name'
user.first_name = user.get_name
puts 'Enter last name'
user.last_name = user.get_name

puts user.fullname