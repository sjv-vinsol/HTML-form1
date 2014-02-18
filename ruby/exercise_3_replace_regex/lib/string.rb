class String
  def replace_pattern(regex, replace_by)
    self.gsub(regex, replace_by)
  end
end