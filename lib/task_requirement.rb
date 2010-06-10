class TaskRequirement

  attr_accessor :val

  def initialize val
    @val = val
  end

  def init_achievement achievement, user
  end

  def satisfy?
  end

  def notify_create resource, achievement
     return unless resource.is_a? @@expect_class
  end

  def valid?
    true
  end

end

class BlogMoreThanRequirement < TaskRequirement

  def init_achievement achievement, user
    achievement[:blogs_count] = user.blogs_count
  end

  def satisfy? achievement
    achievement[:blogs_count] > @val
  end

  def notify_create resource, achievement
    #return unless resource.is_a? Blog
    #achievement[:blogs_count] = achievement[:blogs_count] + 1
  end

end
class BlogAddRequirement < TaskRequirement
  def init_achievement achievement, user
    achievement[:blogs_add] = 0
  end
  
  def satisfy? achievement
    achievement[:blogs_add] > @val
  end

  def notify_create resource, achievement
    #return unless resource.is_a? Blog
    #achievement[:blogs_add] = achievement[:blogs_add] + 1
  end
end


class CommentDifferentBlogsRequirement < TaskRequirement

  def init_achievement achievement, user
    achievement[:comment_blogs] = []
  end

  def satisfy? achievement
    achievement[:comment_blogs].count > val
  end

  def notify_create resource, achievement
    return unless resource.is_a? Comment
    return unless resource.commentable_type == 'Blog'
    if !achievement[:comment_blogs].include?(resource.commentable_id)
      achievement[:comment_blogs] << resource.commentable_id
    end
  end

end


["character","game", "sharing", "notice", "notification",
 "friend", "album","photo", "guild", "poll", "video", "status"].each do |klass_name|
  klass = Object.const_set( "#{klass_name}_more_than_requirement".camelize, Class.new(TaskRequirement) )
  klass.class_eval do
    define_method(:expected_class) do
      if klass_name == "character"
        "GameCharacter"
      else
        klass_name.camelize
      end
    end

    $stderr.puts klass.name, klass.send(:class_variable_get, :@@expect_class).inspect

    define_method("init_achievement") do |achievement, user|
      achievement["#{klass_name.pluralize}_count".to_sym] = user.send("#{klass_name.pluralize}_count".to_sym)
    end
  
    define_method("satisfy?") do |achievement|
      $stderr.puts "req: " + @val.to_s
      $stderr.puts "i have: " + achievement["#{klass_name.pluralize}_count".to_sym].to_s
      achievement["#{klass_name.pluralize}_count".to_sym] > @val
    end

    define_method("notify_create") do |resource, achievement|
      
      return unless resource.is_a? expected_class.constantize  # my_expect #klass.class_variable_get(:@@expect_class)
      achievement["#{klass_name.pluralize}_count".to_sym] += 1
    end
    
    define_method("notify_destroy") do |resource|
    end
  end
end

