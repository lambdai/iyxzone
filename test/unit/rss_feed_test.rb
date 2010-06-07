require 'test_helper'

class RssFeedTest < ActiveSupport::TestCase

  test "rss link not blank" do
    r = RssFeed.new(:user_id => @user.id, :link => "")
    assert !r.save, "rss link can't be blank"
  end

	test "rss belongs_to a user" do
		r = RssFeed.new(:link => "blabla", :user_id => 2010)
		assert !r.save, "RSSFeed must belong to an exist user"
	end

	test "rss successfully create" do
		r = RssFeed.new(:link => "hahaha", :user_id => @user.id)
		assert r.save, "RSS Feed show be create successfully"
	end

	def setup
		@user = UserFactory.create
	end
end
