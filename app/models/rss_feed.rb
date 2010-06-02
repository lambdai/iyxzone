class RssFeed < ActiveRecord::Base
  belongs_to :user
  validates_numericality_of :user_id
  validate :is_rss?
  validate :has_user_id?

  #TODO
  def is_rss?
    errors.add(:link, "不是可用的rss链接") if link.blank?
  end

  def has_user_id?
    errors.add(:user_id, "不存在这个用户") unless User.find(:first, :conditions => ["id = ?",user_id])
  end
=begin
  def update_blogs
    content = open(source).read
    @rss = RSS::Parser.parse(content)
    @rss.items.each do |item|
      this_date = DateTime.parse item.date.to_s
      if this_date > last_update
        update_article item
      end
      last_update = DateTime.now
    end
  end

  #碰到错误，只管跳过！
  def update_article item
    Blog.create(:user_id => user_id, title => item.title,
                :preivilege => 1,
                :game_id => proper_game_id,
                :content => item.description
                )
  rescue
    logger.error "Error in get remote blogs: rss_feed\n#{this.inspect}\nitem\n #{item.inspect}\n"
  end

  def proper_game_id
    @proper_game_id ||= GameCharacter.find_first_by_user_id(user_id).game_id
  end
=end
end
