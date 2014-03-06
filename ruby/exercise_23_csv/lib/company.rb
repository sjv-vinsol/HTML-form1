class Company
  def read_csv(path)
    employee_records = []
    CSV.foreach(path) { |row| employee_records << [row[0], row[1], row[2]] }
    employee_records.drop(1)
  end

  def write_to_csv(path, emp_records)
    CSV.open(path, "w") do |writer|
      group_by_designation(emp_records).each do |designation, emp_records|
        writer << [designation]
        emp_records.each do |record|
          writer << employee_csv_display_format(record)
        end
        writer << [' ']
      end
    end
  end

  def group_by_designation(emp_records)
    emp_records.group_by { |record| record[2] }
  end

  def employee_csv_display_format(emp_record)
    ["#{emp_record[0]} (EmpId: #{emp_record[1]})"]
  end
end