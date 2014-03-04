class String
  class InvalidFormat < StandardError ; end
  class Blank         < StandardError ; end

  TIME_REGEX = /\A(?:[0-1][0-9]|[2][0-3]):[0-5][0-9]:[0-5][0-9]\Z/
  
  def validate_and_return!
    if empty?
      raise Blank.new('Time cant be blank')
    elsif !(self =~ TIME_REGEX)
      raise InvalidFormat.new('Expected time format: hh:mm:ss')
    else
      DateTime.parse(self)
    end
  end
end