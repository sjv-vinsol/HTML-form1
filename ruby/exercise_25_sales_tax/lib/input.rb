require_relative 'prompt_and_validate'

class Input
  include PromptAndValidate
  attr_reader :name, :imported, :master_price

  def initialize
    @name = get_and_validate('Name of the product: ')
    @imported = get_and_validate('Imported?: ')
    @master_price = get_and_validate('Price: ').to_i
  end  
end