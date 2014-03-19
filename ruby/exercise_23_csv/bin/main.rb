require_relative '../lib/csv_parser'

CsvParser.read("#{File.expand_path(File.dirname(__FILE__))}/employee.csv")
CsvParser.write("#{File.expand_path(File.dirname(__FILE__))}/employee.txt")