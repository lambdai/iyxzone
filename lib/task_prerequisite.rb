class TaskPrerequisite

  attr_accessor :val

  def initialize val
    @val = val
  end

  def satisfy? user
  end

  def valid?
    true
  end

end

class PretasksPrerequisite < TaskPrerequisite

  def satisfy? user
    (user.user_tasks.select{|t| t.is_done?}.map(&:task_id) & val) == val
  end

  def valid
    val.is_a? Array
  end

end


class BlogMoreThanPrerequisite < TaskPrerequisite

  def satisfy? user
    user.blogs_count > val
  end

  def valid?
    val.is_a? Integer
  end

end

class ProfileCompletenessPrerequisite < TaskPrerequisite

  def satisfy? user
    user.profile.completenss > val
  end

  def valid?
    val.is_a? Integer
  end 

end

["game_attention", "unread_notice", "unread_notification",
"participated_guild","participated_poll","friend_request",
"guild_request", "event_request", "poll_invitation", "poke_delivery" ]

["character","game", "sharing", "notice", "notification",
 "friend", "album","photo", "guild", "poll", "video", "status"].each do |klass_name|
  klass = Object.const_set( "#{klass_name}_more_than_prerequisite".camelize, Class.new )
  klass.class_eval do
    
    klass.inherite TaskPrerequisite
    define_method(:satisfy?) do |user|
      user.send(klass_name.pluralize+"_count") > val
    end

    def valid?
      val.is_a? Integer
    end
  end  
                           
end
