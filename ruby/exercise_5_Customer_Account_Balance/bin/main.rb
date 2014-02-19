require_relative '../lib/customer'

customer1 = Customer.new("name1")
customer2 = Customer.new("name2")

p "customer1 Name : #{customer1.name}"
p "customer1 balance : #{customer1.balance}"
p "customer1 account_number : #{customer1.account_number}"

p "customer2 Name : #{customer2.name}"
p "customer2 balance : #{customer2.balance}"

p "customer2 account_number : #{customer2.account_number}"

customer1.deposit(2000)
customer2.withdraw(500)

p "customer1 new balance : #{customer1.balance}"
p "customer2 new balance : #{customer2.balance}"