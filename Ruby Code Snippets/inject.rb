# x = [1,2,3,4,5,6]
# v = x.inject({}) do |r, e|
#   index = x.index(e)
#   if index.even?
#     r[e] = x[index + 1]
#   end
#   r
# end


# h = {:odd => [], :even => []}
h = Hash.new { |h,k| h[k] = Array.new }
x = ['abc','def','abcd','x','mnop','zZzZ'].map {|val| h[val.length] << val }

p h