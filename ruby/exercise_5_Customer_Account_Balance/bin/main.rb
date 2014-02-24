require_relative '../lib/customer'

customer1 = Customer.new("name1")
customer2 = Customer.new("name2")

def print_details(customer)
  puts "Name : #{customer.name}"
  puts "balance : #{customer.balance}"
  puts "account_number : #{customer.account_number}"
  puts "----------------------------------"
end

print_details(customer1)
print_details(customer2)

customer1.deposit(2000)
customer2.withdraw(500)

puts "customer1 new balance : #{customer1.balance}"
puts "customer2 new balance : #{customer2.balance}"