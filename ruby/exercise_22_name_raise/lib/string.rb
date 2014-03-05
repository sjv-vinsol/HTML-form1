class String
  class CapitalizeError < StandardError; end
  class BlankError      < StandardError; end

  def capitalize?
    self == self.capitalize
  end

  def validate_and_return!
    if empty?
      raise BlankError, 'Name cannot be blank'
    elsif !capitalize?
      raise CapitalizeError, 'First letter of name should be capital'
    else
      self
    end
  end
end