module PromptAndValidate
  class NotNillError < StandardError; end

  def get_and_validate(message)
    begin
      prompt_and_get!(message)
    rescue StandardError => e
      puts "#{e.class}: #{e.message} \n \n"
      retry
    end
  end

  def prompt_and_get!(message)
    print message
    input = gets.chomp.strip.downcase
    raise(NotNillError, 'Input cant be blank') if input.strip.empty?
    input
  end

end