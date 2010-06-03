require 'open-uri'
require 'rss/1.0'
require 'rss/2.0'

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

  def mydebug str
    $stderr.puts str
  end
  def myexp exp
    x = eval(exp)
    mydebug exp + ": #{x}"
  end

  def update_blogs opt={}
		
    content = open(self.read_attribute(:link)).read
    @rss = RSS::Parser.parse(content)
    
    @rss.items.each do |item|
      article_date = DateTime.parse item.date.to_s
      if article_date > last_update
        update_article item
      end
    end
		last_update = DateTime.now
		if opt[:log]
			logger.error "#{DateTime.now}: updated rss_feed #{self.read_attribute(:id)}"
		end
  end

  #碰到错误，只管跳过！
  def update_article item
    b = Blog.new(:poster_id => user_id, :title => item.title,
                :privilege => 1,
                :game_id => proper_game_id,
                :content => item.description,
								:type => "RemoteBlog",
								:orig_link => item.link
                )
		b.save
		#puts "update #{item.title}"
  rescue
    logger.error "Error in get remote blogs: rss_feed\n#{inspect}\nitem\n #{item.title}\n"
    logger.error "b.errors.inspect"
  end

  def proper_game_id
    @proper_game_id ||= GameCharacter.find_by_user_id(user_id).game_id
  end

end
