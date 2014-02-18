require_relative "../lib/bike"

bike = Bike.new(2000, "CB Trigger", "Uday Honda")
p bike.details
bike.price = 1000
p bike.price