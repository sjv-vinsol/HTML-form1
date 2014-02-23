require 'date'

class Time
  def self.add_time(time1, time2)
    time = Time.at(convert_to_second(DateTime.parse(time1)) + convert_to_second(DateTime.parse(time2))).getutc
    "#{"1 day & " if time.day == 2}" + time.strftime("%T")
  end

  def self.convert_to_second(date)
    date.hour * 3600 + date.min * 60 + date.sec
  end
end