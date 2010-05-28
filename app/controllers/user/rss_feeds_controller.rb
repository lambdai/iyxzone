require "open-uri"
require "rss/1.0"
require "rss/2.0"

class User::RssFeedsController < UserBaseController

  layout 'app'
  
  def index
    @rss_feed = current_user.rss_feed    
  end

  def show
  end

  def create
    @rss_feed = current_user.create_rss_feed(:link => params[:rsslink],
                                 :last_update => DateTime.now)
    if @temp_rss_article = current_user.temp_rss_articles.all
      @temp_rss_article.each do |article|
        if params[:items].include? article.article_index.to_s
          add_to_my_blog article
        end
      end
      TempRssArticle.delete_all("user_id = #{current_user.id}")
    end
  end

  def view
    if params[:drop]
      clear_my_rss_feed
      redirect_to rss_feeds_path
    else
      begin
        get_blogs params[:rsslink]
      rescue RSS::NotWellFormedError
        flash[:notice] = "不是标准的RSS链接"
        @rss = nil
        redirect_to new_rss_feed_path
      rescue
        flash[:notice] = "目标地址暂时不可用"
        @rss = nil
        redirect_to new_rss_feed_path
      else
        render :view
      end
    end
  end



  def new
    @rss_feed = current_user.rss_feed
  end
protected
  def clear_my_rss_feed
    flash[:notice] = "您已经放弃更新您的站外日志"
    RssFeed.delete_all("user_id = #{current_user.id}")
  end


  #地址不对可能是SocketError
  #parse错误是RSS::NotWellFormedError
  def get_blogs source
    content = open(source).read
    @rss = RSS::Parser.parse(content)
    TempRssArticle.delete_all("user_id = '#{current_user.id}'")
    @rss.items.each_with_index do |item,i|
      #current_user.create_temp_rss_article
      TempRssArticle.create(:user_id => current_user.id, :article_index => i, :title => item.title,
                            :link => item.link, :article => item.description, :create_at => DateTime.now)
    end
  end
  
  #就不报错了，发生错误的直接掠过，哈哈
  def add_to_my_blog temp_article
    blog = current_user.blogs.build(:title => temp_article.title,
                             :privilege => params[:privilege][temp_article.article_index.to_s].to_i,
                             :game_id => params[:game][temp_article.article_index.to_s].to_i,
                             :content => temp_article.article
                             )
    blog.save
    #should never rescue
  rescue
    logger.error "User #{current_user.id} tried to save blog but failed"
    logger.error "temp_article is\n temp_article.inspect"
  end
  
  def set_last_update
    @rss_feed.last_update = DateTime.now
  end
end
