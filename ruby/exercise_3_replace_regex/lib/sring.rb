class String
  def replace_string(regex, replace_by)
    self.gsub(regex, replace_by)
  end
end