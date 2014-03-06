require_relative 'input'

class Product
  attr_accessor :name, :price, :master_price, :tax
  attr_reader :sales_tax, :imported, :import_duty

  Categories = { food: ['Chips', 'drinks', 'grocery'], book: ['fiction', 'suspence'], medicine: [] }
  SALES_TAX = 10
  IMPORT_DUTY = 5

  def initialize
    puts "\n"
    input = Input.new
    @name = input.name
    @imported = input.imported
    @master_price = input.master_price
  end

  def evaluate_tax
    @sales_tax = (product_in_tax_exemption_category?) ? 0 : SALES_TAX
    @import_duty = ((imported == ('y' || 'yes')) ? IMPORT_DUTY : 0)
    @tax = (sales_tax + import_duty) * master_price / 100
  end

  def evaluate_price
    evaluate_tax
    @price = master_price + tax
  end

  def product_in_tax_exemption_category?
    Categories.each do |category, sub_categories|
      return  true if sub_categories.include?(name)
    end
    false
  end
end