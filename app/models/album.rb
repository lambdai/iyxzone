class Album < ActiveRecord::Base

	belongs_to :poster, :class_name => 'User'

  belongs_to :game

  named_scope :recent, :conditions => "photos_count != 0 AND privilege != 4 AND verified IN (0,1)", :order => 'uploaded_at DESC'

  needs_verification :sensitive_columns => [:title, :description]

  acts_as_privileged_resources :owner_field => :poster

  acts_as_shareable :path_reg => [/\/personal_albums\/([\d]+)/, /\/event_albums\/([\d]+)/, /\/guild_albums\/([\d]+)/, /\/avatar_albums\/([\d]+)/],
                    :default_title => lambda {|album| album.title}, 
                    :create_conditions => lambda {|user, album| album.privilege != 4}

  acts_as_resource_feeds

end
