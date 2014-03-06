require 'csv'
require_relative '../lib/company'

company = Company.new
employee_records = company.read_csv("#{File.expand_path(File.dirname(__FILE__))}/employee.csv")
company.write_to_csv("#{File.expand_path(File.dirname(__FILE__))}/employee.txt", employee_records)