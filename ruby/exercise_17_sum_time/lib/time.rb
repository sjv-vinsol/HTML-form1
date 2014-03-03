require 'date'

class Time
  class InvalidTimeFormat < StandardError ; end
  class NotNill           < StandardError ; end

  TIME_REGEX = /\A(?:[0-1][0-9]|[2][0-3]):[0-5][0-9]:[0-5][0-9]\Z/

  def self.get_and_validate
    begin
      time = gets.chomp
      if time.empty?
        raise NotNill.new('Time cant be blank')
      elsif !(time =~ TIME_REGEX)
        raise InvalidTimeFormat.new('Expected time format: hh:mm:ss')
      else
        time
      end
    rescue StandardError => e
      puts "#{e.class}: #{e.backtrace}"
      print 'Enter time: '
      get_and_validate
    end
  end

  def self.add_time(input_user_time1, input_user_time2)
    time = Time.at(to_second(DateTime.parse(input_user_time1)) + to_second(DateTime.parse(input_user_time2))).getutc
  end

  def self.to_second(date)
    date.hour * 3600 + date.min * 60 + date.sec
  end

  def self.humanize(time)
    "#{"1 day & " if time.day == 2}" + time.strftime("%T")
  end
end