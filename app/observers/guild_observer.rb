require 'app/mailer/guild_mailer'

class GuildObserver < ActiveRecord::Observer

  def before_create guild
    # verify
    guild.verified = guild.sensitive? ? 0 : 1

    # inherit some attributes from character
    c = guild.president_character
    guild.game_id = c.game_id
    guild.game_server_id = c.server_id
    guild.game_area_id = c.area_id
  end

  def after_create guild
    # create album,forum and moderator_forum
    guild.create_album
    forum = guild.create_forum(:name => "工会#{guild.name}的论坛", :description => "工会#{guild.name}的论坛")
   
    # create membership
    guild.memberships.build(
      :user_id => guild.president_id, 
      :character_id => guild.character_id, 
      :status => Membership::President
    ).save_with_validation(false)
 
    # create absence rule and presence rule
    GuildRule.new(:guild_id => guild.id, :reason => "无故缺席", :outcome => -5, :rule_type => 0).save_with_validation(false)
    GuildRule.new(:guild_id => guild.id, :reason => "准时出席", :outcome => 5, :rule_type => 1).save_with_validation(false)
    
    # increment counter
    guild.president.raw_increment :guilds_count

    # issue feeds if necessary
    if guild.president.application_setting.emit_guild_feed == 1 
      guild.deliver_feeds
    end
  end

  def before_update guild
    # verify 
    if guild.sensitive_columns_changed? and guild.sensitive?
      guild.verified = 0
    end
  end

  def after_update guild
    if guild.recently_unverified
      User.update_all("participated_guilds_count = participated_guilds_count - 1", {:id => (guild.people - [guild.president]).map(&:id)})
      guild.president.raw_decrement :guilds_count
      guild.destroy_feeds # membership的feed就不删了，反正他们本来就没评论
      guild.album.unverify
    elsif guild.recently_verified_from_unverified
      User.update_all("participated_guilds_count = participated_guilds_count + 1", {:id => (guild.people - [guild.president]).map(&:id)})
      guild.president.raw_increment :guilds_count
      guild.deliver_feeds 
      guild.album.verify
    end
  end

  def before_destroy guild
    # modify requests count
    guild.president.raw_decrement :guild_requests_count, guild.requests_count

    # modify invitations count
    guild.invitations.each do |invitation|
      invitation.user.raw_decrement :guild_invitations_count
    end

    # send notifications
    if guild.verified != 2
      (guild.people - [guild.president]).each do|p|
        p.notifications.create(:category => Notification::GuildCancel, :data => "工会 #{guild.name} 取消了")
        GuildMailer.deliver_guild_cancel guild, p if p.mail_setting.cancel_guild == 1
      end
    end

    # destroy all memberships
    # 如果memberships的dependent是destroy，很有可能在这个before_destroy之前，他就被删除了，那上面的guild.people是空的，就没法发通知了
    guild.memberships.each do |m|
      m.destroy_feeds
    end

    if guild.verified != 2
      User.update_all("participated_guilds_count = participated_guilds_count - 1", {:id => guild.memberships.map(&:user_id)})
      guild.president.raw_decrement :guilds_count
    end

    Membership.delete_all(:guild_id => guild.id)
  end
  
end
