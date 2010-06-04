require 'task_prerequisite'
require 'task_requirement'

class Task < ActiveRecord::Base

  EVERYDAY = 0
  INVISIBLE = 1
  REGULAR = 2  

	serialize :prerequisite, Hash
	
  serialize	:requirement,	Hash
	
  serialize	:description, Hash
	
  serialize	:reward, Hash

	has_many :user_tasks

  validate_on_create :prerequisite_is_valid

  validate_on_create :requirement_is_valid
  
  def select_this user
    @user_task = UserTask.create(:task_id => id, :user_id => user.id)
  end
  
  def complete_this user
    #    get_user_task(user_id).complete
    #   give_reward user_id
  end
  
  def give_reward user
    true
  end
  
  def get_user_task user
    @user_task ||= UserTask.find(:first, :conditions => ["user_id = ? AND task_id = ? ", user.id, id])
  end
  
  def status
    if @user_task
      @user_task.achievement
    else
      nil
    end
  end


  def prerequisites
    prerequisite.map{|key, value| "#{key}_prerequisite".camelize.constantize.new(value) }
  end
  
  def is_selectable_by? user
    prerequisites.all? {|p| p.satisfy? user}
  end

  def requirements
    requirement.map{|key, value| "#{key}_requirement".camelize.constantize.new(value)}
  end

  def selected_by? user
    user_tasks.exists? :user_id => user.id
  end

	def is_everyday?
		return true if catagory == Task::EVERYDAY
	end

	def is_visible?
		return true if catagory != Task::INVISIBLE
	end

	def is_started?
		return true if starts_at < DateTime.now	
	end

	def is_expired?
		return true if expires_at < DateTime.now
	end

#protected

  def prerequisite_is_valid
    prerequisites.all? {|p| p.valid? }
  end

  def requirement_is_valid
    requirements.all? {|r| r.valid? }
  end
	
end
