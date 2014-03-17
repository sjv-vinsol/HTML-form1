def method(&block)
	block.call("sanjeev")
	yield("testing")
end

p = Proc.new {|var,t| p "I am in proc and my name is #{var} and #{t}"}
method(&p)