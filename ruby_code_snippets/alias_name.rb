class Test
  def say(name)
    p "Old method #{name}"
  end
end

class Test
  alias :old_say :say
  def say
    p "new method"
  end
end

Test.new.say
Test.new.old_say("Sanjeev")