module Fun
  def make_fun
    p 'This is Fun'
  end
end



class Test
  include Fun

end

Test.make_fun

