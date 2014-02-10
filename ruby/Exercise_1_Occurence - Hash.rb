h = {}
s = "This is test"
s.each_char do |x|
	if h.has_key?(x)
	  h[x] = h[x] + 1
   elsif x != " "
    h[x] = 1
  end
end
p h