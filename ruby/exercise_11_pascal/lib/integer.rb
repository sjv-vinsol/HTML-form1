class Integer
  def fact(n)
    (n > 0) ? (1..n).reduce(:*) : 1
  end

  def display_pascal
    (0..self).each do |row_count|
      row = []
      (0..row_count).each do |column|
        row << (fact(row_count) / (fact(column) * fact(row_count - column)))
      end
      p row
    end
  end
end