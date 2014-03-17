class Input
  def initialize
    @input = []
  end

  def read
    begin
      input = gets.strip
      @input << input
    end while valid?(input)
  end

  def valid?(input)
    !(input.empty? || input == 'q')
  end

  def process
    (@input.pop.empty?) ? evaluate : puts('You choose to exit without evaluating code!!')
  end

  def evaluate
    eval(@input.join(';'))
  end
end