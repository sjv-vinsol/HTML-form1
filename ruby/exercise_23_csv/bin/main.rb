require_relative '../lib/csv'
csv = Csv.new
emp_record = csv.parse("#{File.expand_path(File.dirname(__FILE__))}/employee.csv")

# group employee record by designation
emp_record_group_by_designation = emp_record.group_by { |empId, record| record['Designation']}
csv.store(emp_record_group_by_designation, "#{File.expand_path(File.dirname(__FILE__))}/employee.txt")