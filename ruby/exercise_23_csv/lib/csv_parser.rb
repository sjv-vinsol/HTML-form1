require 'csv'
require_relative 'employee'

class CsvParser
  def self.read(path)
    employees = []
    CSV.foreach(path) { |row| Employee.new(row[0], row[1].strip, row[2].strip) }
    Employee.all.shift
  end

  def self.write(path)
    CSV.open(path, "w") do |writer|
      Employee.group_by_designation.each do |designation, employees|
        writer << [designation]
        employees.each do |employee|
          writer << Employee.display_format(employee)
        end
        writer << [' ']
      end
    end
  end

end