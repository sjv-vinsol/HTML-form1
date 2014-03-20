hash = Hash.new { |h,k| h[k] = Array.new }
["abc", "axn", "sadff", "as"].map {|val| hash[val.length] << val }

h = {:odd => [], :even => []}

hash.inject(h) do |r, (k, v) | 
  if k.even?
    h[:even] << v
  else
    h[:odd] << v
  end
  r
end
p h