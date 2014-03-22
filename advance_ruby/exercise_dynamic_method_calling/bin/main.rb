require_relative '../lib/derived'
require_relative '../lib/string'

extract_class_pattern = /(.*).new/
puts 'Create object : '

input_object = gets.chomp
extract_class_pattern.match(input_object)

klass = Object.const_get($1)
obj = klass.new

print 'Enter a method name :'
input_method = gets.chomp
parsed = input_method.get_method_and_params
method_name = parsed.shift
puts obj.send(method_name, *parsed)