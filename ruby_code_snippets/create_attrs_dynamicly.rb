module Accessors
  def my_attr(*vars)
    p vars
    vars.each do |method|
      ivar = "@#{method}"

      define_method(method) do
        instance_variable_get(ivar)
      end

      define_method("#{method}=") do |value|
        instance_variable_set(ivar, value)
        # ivar = value
      end
    end
  end
end


class CreateAttrs
  extend Accessors
  my_attr :val, :test
end

# puts CreateAttrs.val
# CreateAttrs.val = 'HEre i am in'
# puts CreateAttrs.val

ca = CreateAttrs.new
p ca.val
ca.val = 'Here I am'
p ca.val

p ca.test
ca.test = 'I am in a test!!'
puts ca.test