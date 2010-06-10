class TaskFactory
  
  def self.create cond={}
    task = Factory.create :task, cond
    task
  end

end
