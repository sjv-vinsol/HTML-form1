class Array
  def group_by_odd_even
    hash = group_by { |elem| elem.to_s.length }
    hash.inject({ :odd => [], :even => [] }) do | result, (key, val) |
      result[key.even? ? :even : :odd] << val
      result
    end
  end
end