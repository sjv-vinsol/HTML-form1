require_relative '../lib/name'

name = Name.new

name.first_name = name.prompt_user('first')
name.last_name = name.prompt_user('last')
puts "Fullname : #{name.fullname}"