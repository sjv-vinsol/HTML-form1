require_relative 'prompt_and_validate'

class Product
  include PromptAndValidate

  attr_accessor :name, :price, :master_price, :tax
  TYPES = { food: ['Chips', 'drinks', 'grocery'], book: ['fiction', 'suspence'], medicine: [] }
  SALES_TAX = 10
  IMPORT_DUTY = 5

  def prompt_details
    puts "\n"
    @name = prompt_and_get('Name of the product: ')
    @sales_tax = (product_in_tax_exumption_category?) ? 0 : 10
    @imported = prompt_and_get('Imported?: ')
    puts "Exempted from sales tax? #{(@sales_tax == 10) ? 'No' : 'Yes'}"
    @master_price = prompt_and_get('Price: ').to_i
  end

  def evaluate_price
    @tax = (@sales_tax + import_duty) * @master_price / 100
    @price = @master_price + @tax
  end

  def product_in_tax_exumption_category?
    TYPES.each do |category, sub_categories|
      sub_categories.each do |sub_category|
        return true if sub_category == name
      end
    end
    false
  end

  def import_duty
    (@imported == ('y' || 'yes')) ? IMPORT_DUTY : 0
  end
end