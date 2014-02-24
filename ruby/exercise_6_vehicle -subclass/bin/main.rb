require_relative '../lib/bike'

bike = Bike.new(2000, 'CB Trigger', 'Uday Honda')
puts bike.details
bike.price = 1000
puts bike.price