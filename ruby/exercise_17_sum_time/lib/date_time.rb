class DateTime
  def add(time)
    Time.at(self.to_seconds + time.to_seconds).getutc
  end

  def to_seconds
    self.hour * 3600 + self.min * 60 + self.sec
  end
end