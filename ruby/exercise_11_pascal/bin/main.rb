require_relative '../lib/integer'
require_relative '../lib/pascal'

pascal = Pascal.new
pascal.upto(4).each do |row|
  puts row.join(' ')
end