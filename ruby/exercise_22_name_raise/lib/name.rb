class Name
  class NotNillError < StandardError; end
  class CapitalizeError < StandardError; end

  attr_accessor :first_name, :last_name

  def prompt_user(numeral)
    begin
      puts "Enter #{numeral} name"
      input_name = gets.chomp
    end while !self.valid?(input_name)
    input_name
  end

  def valid?(name)
    begin
      case
      when name == ''
        raise NotNillError, 'Name cannot be blank'
      when name != name.capitalize
        raise CapitalizeError, 'First letter of name should be capital'
      else
        true
      end
    rescue NotNillError => e
      puts "#{e.class}: #{e.message}"
      false
    rescue CapitalizeError => e
      puts "#{e.class}: #{e.message}"
      false
    end
  end

  def fullname
    "#{self.first_name} #{self.last_name}"
  end
end