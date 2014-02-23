require 'date'

class Time
  def self.add_time(*time)
    total_seconds = time.inject(0) do |sum, date|
      sum.to_i + convert_to_second(DateTime.parse(date))
    end
    time = Time.at(total_seconds).getutc
    (time.day > 1) ? ("#{time.day - 1} day & " + time.strftime('%T').to_s) : time.strftime('%T')
  end

  def self.convert_to_second(date)
    date.hour * 3600 + date.min * 60 + date.sec
  end
end