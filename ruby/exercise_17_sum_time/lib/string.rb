class String
  TIME_REGEX = /\d?\d:\d?\d:\d?\d/
  def valid_time?
    !!(TIME_REGEX =~ self)
  end
end