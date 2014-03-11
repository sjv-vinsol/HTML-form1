class String
  class CapitalizeError < StandardError; end
  class BlankError      < StandardError; end

  def capitalize?
    self == self.capitalize
  end

  def validate!
    if empty?
      raise BlankError, 'Cannot be blank'
    elsif !capitalize?
      raise CapitalizeError, 'First letter should be capital'
    else
      self
    end
  end
end