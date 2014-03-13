class Pascal
  # returns nested array of each row in pascal triangle.
  def upto(no_of_rows)
    pascal = []
    (0..no_of_rows).each do |row_count|
      row = []
      (0..row_count).each do |column|
        row << (row_count.factorial / (column.factorial * (row_count - column).factorial))
      end
      pascal << row
    end
    pascal
  end
end