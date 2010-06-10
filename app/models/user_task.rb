class UserTask < ActiveRecord::Base
	
	belongs_to :task

	belongs_to :user

	serialize	:achievement, Hash

  validate_on_create :task_is_valid
  
  before_create :initialize_achievements

  named_scope :not_done, :conditions => { :done_at => nil}
  def notify_create resource
    task.requirements.each { |r| r.notify_create resource, achievement }
    self.save
    $stderr.puts "AFTER Create: the achievement is:"
    $stderr.puts achievement.inspect
  end

  def give_reward
    done_at = DateTime.now
  end

  def is_expired?
    DateTime.now > expires_at
  end

  def is_complete?
    task.requirements.all? {|r| r.satisfy? achievement}
  end

  def is_done?
    done_at
  end

  before_create :initialize_achievements

protected

  def task_is_valid
    return if user_id.blank? or task_id.blank?

    if task.blank?
      errors.add(:task_id, "不存在")
    elsif task.selected_by?(user)
      errors.add(:task_id, "重复选择")
    elsif !task.is_selectable_by?(user)
      errors.add(:task_id, "不能选择")
    end
  end

  def initialize_achievements
    self.achievement = {}
    task.requirements.each do |r|
      r.init_achievement achievement, user
    end
#    puts achievement.inspect
  end

end
