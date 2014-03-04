require 'date'

class String
  class InvalidTimeFormat < StandardError ; end
  class Blank             < StandardError ; end

  TIME_REGEX = /\A(?:[0-1][0-9]|[2][0-3]):[0-5][0-9]:[0-5][0-9]\Z/

  def validate_and_return!
    if empty?
      raise Blank.new('Time can\'t be blank')
    elsif !(self =~ TIME_REGEX)
      raise InvalidTimeFormat.new('Expected time format: hh:mm:ss')
    else
      DateTime.parse(self)
    end
  end
end

class DateTime
  def to_second
    hour * 3600 + min * 60 + sec
  end
end

class Time
  def self.get_and_validate
    begin
      gets.chomp.validate_and_return!
    rescue StandardError => e
      puts "#{e.class}: #{e.message}"
      print 'Enter time(hh:mm:ss): '
      retry
    end
  end

  def self.add(input_time1, input_time2)
    Time.at(input_time1.to_second + input_time2.to_second).getutc
  end

  def humanize
    "#{"1 day & " if day == 2}" + strftime("%T")
  end
end