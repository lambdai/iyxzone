namespace :blogs do

  desc "删除那些没用的博客图片"
  task :clear_orphan_blog_images => :environment do
    BlogImage.all.group_by(&:blog_id).map do |blog_id, images|
      if blog_id.blank?
        images.each do |image|
          image.destroy
        end
      else
        blog = Blog.find(blog_id)
        images.each do |image|
          image.destroy if image.updated_at != blog.updated_at # compare timestamps
        end
      end
    end
  end

	desc "从rss链接获得用户的blog"
	task :get_rss_blog => :environment do
		require 'threadpool'
	  rss_feeds = RssFeed.all

		pool = ThreadPool.new(10) 
		rss_feeds.each do |rss_feed|  
		  pool.process do #{$stderr.puts rss_feed}  
				rss_feed.update_blogs({:log => true})
			end
		end  
		pool.join


	end

end
