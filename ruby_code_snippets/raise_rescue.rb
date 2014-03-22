# def test
# begin
#   1/0
# rescue
#   # p Exception.new.message
#   raise TestError, "This is a test"
# end
# end

# test

class NegativeNumberError
  def raise_exception
    begin
      puts 'Before raise'
      raise NegativeNumberError
      # 1/0
      # puts 'After raise'
    rescue Exception => t
      puts "You cannot enter negative numbers"
      # puts t.backtrace
    # rescue NegativeNumberError          # exception class
    #   p '@@@@@@@@@@@@@@@@@'
    # rescue ArgumentError            # exception class
    #   p '!!!!!!!!!!!!!!!!!'
    # rescue StandardError
    #   p "%%%%%%%%%%%%%"
    end
  end
end

NegativeNumberError.new.raise_exception