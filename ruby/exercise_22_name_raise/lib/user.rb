require_relative 'string'

class User
  attr_accessor :first_name, :last_name

  def get_name
    begin
      gets.chomp.validate!
    rescue StandardError => e
      puts "#{e.class}: #{e.message}"
      print 'Enter Name: '
      retry
    end
  end

  def fullname
    "#{first_name} #{last_name}"
  end
end