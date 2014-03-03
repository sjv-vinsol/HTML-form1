class String
  TIME_REGEX = /^(?:[0-1]?[0-9]|[2][0-3]):[0-5]?[0-9]:[0-5]?[0-9]$/
  
  def valid_time?
    time = self.split(':')
    TIME_REGEX =~ self
  end
end