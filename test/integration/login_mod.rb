module LoginMod
  
  def login user
    open_session do |session|
      session.post "/sessions/create", :email => user.email, :password => user.password
      session.assert_redirected_to home_url
    end  
  end 

end
