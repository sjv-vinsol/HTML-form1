require 'date'
require_relative 'string'
require_relative 'date_time'

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