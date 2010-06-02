class CreateTempRssArticles < ActiveRecord::Migration
  def self.up
    create_table :temp_rss_articles ,:id => false do |t|
			t.integer :user_id
			t.integer	:article_index
			t.text		:title
			t.string	:link
			t.text		:article
			t.datetime :create_at
    end
  end

  def self.down
    drop_table :temp_rss_articles
  end
end
