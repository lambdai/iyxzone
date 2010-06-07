require 'test_helper'

class RssFeedFlowTest < ActionController::IntegrationTest

  def setup
    @avail_rsslink = 'http://snowolf.javaeye.com/rss'
    @user = UserFactory.create
    @character = GameCharacterFactory.create :user_id => @user.id
    @game = @character.game
    @user_sess = login @user
  end

  test "drop rss_feed" do
    @user_sess.get "/rss_feeds/new"
    @user_sess.assert_template 'user/rss_feeds/new'
    
    @user_sess.post "/rss_feeds/import", {"drop" => "bla"}
    @user_sess.assert_redirected_to rss_feeds_path
    @user_sess.assert_equal @user_sess.flash[:notice], "您已经放弃更新您的站外日志"
  end

  test "unvailable rss_feed source" do
    go_to_new_url
    @user_sess.post "/rss_feeds/import", {"commit" => "button", "rsslink" => 'haha'}
    assert_equal @user_sess.flash[:notice], "目标地址暂时不可用"
    @user_sess.post "/rss_feeds/import", {"commit" => "button", "rsslink" => "#{RAILS_ROOT}/script/server"}
    assert_equal @user_sess.flash[:notice], "目标地址暂时不可用"
    @user_sess.post "/rss_feeds/import", {"commit" => "button", "rsslink" => "www.baidu.com"}
    assert_equal @user_sess.flash[:notice], "不是标准的RSS链接"
  end


  test "remove rss_feed" do
    go_to_new_url
    @user_sess.post "/rss_feeds/import", {"commit" => "button", "rsslink" => @avail_rsslink}

    @user_sess.assert_not_equal @user_sess.assigns(:rss).items.size, 0
    @user_sess.post "/rss_feeds/import", {"drop" => "button"}
    @user_sess.assert_nil @user_sess.assigns(:rss)
  end

  test "valid rss_feed source" do
    go_to_new_url
    @user_sess.post "/rss_feeds/import", {"commit" => "buttion", "rsslink" => @avail_rsslink}
    @user_sess.assert_not_equal  @user_sess.assigns(:rss).items.size, 0
		@user_sess.get "/rss_feeds/new"
  end

  test "add article" do
    go_to_new_url
    @user_sess.assert_equal @user.blogs.size, 0
    @user_sess.post_via_redirect "/rss_feeds/import", {"commit" => "button", "rsslink" => @avail_rsslink}
    @user_sess.assert_response :success
    @user_sess.post "/rss_feeds", {"items"=>["0", "1"], "game"=>{"0" => @game.id.to_s , "1" => @game.id.to_s }, "commit"=>"", "privilege"=>{"0"=>"1", "1"=>"1"} }
    @user.reload
    @user_sess.assert_not_equal @user.blogs_count, 0
  end

 protected
  def login user
    open_session do |session|
      session.post "/sessions/create", :email => user.email, :password => user.password
      session.assert_redirected_to home_url
    end
  end

  def go_to_new_url
    @user_sess.get "/rss_feeds/new"
  end

end
