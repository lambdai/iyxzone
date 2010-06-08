require 'factory_girl'
require 'test/factories/base'
=begin
require 'test/factories/user_factory'
require 'test/factories/game_factory'
require 'test/factories/game_character_factory'
require 'test/factories/blog_factory'
require 'test/factories/video_factory'
require 'test/factories/friend_factory'
require 'test/factories/guild_factory'
require 'test/factories/skin_factory'
require 'test/factories/topic_factory'
require 'test/factories/guestbook_factory'
require 'test/factories/admin_factory'
=end

Dir['test/factories/*_factory.rb'].each do |a_factory|
  require a_factory
end


