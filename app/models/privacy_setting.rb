class PrivacySetting < ActiveRecord::Base

	acts_as_setting :bits => 2,
									:defaults => %w[2 2 2 2 3 3 3 3 1 1 1 1 2 1],
									:keys => %w[personal basic_info character_info wall qq phone website email poke friend search send_mail leave_wall_message add_me_as_friend]

end
