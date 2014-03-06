class Interest
  attr_accessor :principal, :time
  attr_reader :rate
  RATE = 10

  def initialize
    @principal, @time, @rate = yield << RATE / 100.to_f
  end

  def diff_in_compound_and_simple
    (compound_interest - simple_interest).round(2)
  end

  def simple_interest
    (principal * time * rate).round(2)
  end

  def compound_interest
    (principal * (((1 + rate) ** time) - 1)).round(2)
  end

  def to_s
    "Difference in compound and simple interest: #{diff_in_compound_and_simple}"
  end
end