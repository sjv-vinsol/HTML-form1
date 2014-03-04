class DateTime
  def to_second
    hour * 3600 + min * 60 + sec
  end
end