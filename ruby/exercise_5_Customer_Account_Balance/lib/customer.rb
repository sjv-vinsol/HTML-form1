class Customer
  attr_reader :account_number, :name, :balance

  @@account_number_counter = 0

  def initialize(name)
    @name = name
    @account_number = (@@account_number_counter += 1)
    @balance = 1000
  end

  def deposit(amount)
    @balance += amount
  end

  def withdraw(amount)
    if amount > @balance
      p "You can only withdraw amount upto #{@amount}"
    else
      @balance -= amount
    end
  end
end