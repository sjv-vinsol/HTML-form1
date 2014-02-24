class Interest
  attr_accessor :principal, :time, :rate

  def diff_in_compound_and_simple()
    simple_interest = @principal * @time * @rate
    compound_interest = @principal * (((1 + @rate) ** @time) - 1)
    (compound_interest - simple_interest).round(2)
  end
end