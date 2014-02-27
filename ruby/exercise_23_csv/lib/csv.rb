class Csv
  def parse(path)
    file = File.readlines(path)
    # extract columns remvoe first element of array
    column = file.shift.chomp.split(', ')
    emp_record = Hash.new { |hash, key| hash[key] = {} }
    file.each do |line|
      # convert employee information into array
      record = line.chomp.split(', ')
      # Iterate over each record and store it in hash
      record.length.times do |i|
        emp_record[record[1]][column[i]] = record[i]
      end
    end
    emp_record
  end

  def store(emp_record_group_by_designation, path)
    File.open(path, 'w') do |file|
      emp_record_group_by_designation.each do |designation, records|
        file.puts designation
        # records here is array whose value at 0 index is the key(employee Id)
        # and value at index 1 is hash(employee record).
        #Below code will iterate over the array and print each employee data.
        records.each do |record|
          # record[1] here is pointing to the employee record.
          file.puts "#{record[1]['Name']} (EmpId: #{record[1]['EmpId']})"
        end
        file.puts "\n"
      end
    end
  end
end