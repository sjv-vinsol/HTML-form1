require_relative '../lib/customer'

customer1 = Customer.new("name1")
customer2 = Customer.new("name2")

puts customer1.details
puts customer2.details

customer1.deposit(2000)
customer2.withdraw(500)

puts "customer1 new balance : #{customer1.balance}"
puts "customer2 new balance : #{customer2.balance}"