module PromptAndValidate
  class NotNillError < StandardError; end

  def prompt_and_get(prompt)
    begin
      print prompt
      input = gets.chomp.strip.downcase
    end while invalid?(input)
    input
  end

  def invalid?(input)
    begin
      raise(NotNillError, 'Input cant be blank') if input.empty?
      false
    rescue NotNillError => e
      puts "#{e.class}: #{e.message} \n \n"
      true
    end
  end
end