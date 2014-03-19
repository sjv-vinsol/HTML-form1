class Employee
  @all = []

  class << self
    attr_accessor :all
  end

  attr_accessor :name, :designation
  attr_reader :id

  def initialize(name, id, designation)
    Employee.all << self
    @name = name
    @id = id
    @designation = designation    
  end

  def self.group_by_designation
    Employee.all.group_by { |employee| employee.designation }
  end

  def self.display_format(employee)
    ["#{employee.name} (EmpId: #{employee.id})"]
  end
end