class ApplicationController < Sinatra::Base

  require "bundler"
  Bundler.require

  require "dotenv"
  Dotenv.load

  ActiveRecord::Base.establish_connection(
    :adapter => "postgresql",
    :database => ENV['DB_name']
  )

  # Need to specify the views / public folder!
  set :views, File.expand_path("../../views", __FILE__)
  set :public_dir, File.expand_path("../../public", __FILE__)

  # enable sessions
  enable :sessions



  # does the user account exist in the system?
  def does_user_exist(user_name)
    user = Account.find_by(:user_name => user_name)
    if user
      return true
    else
      return false
    end
  end



  # check session info with current user
  def authorization_check
    # if there isn't a current session, redirect to login
    if session[:current_user] == nil
      redirect "users/login"
    else
      return true
    end
  end


  # get the current user information
  def get_current_user
    return Account.find_by(user_name: session[:current_user].user_name)
  end


  # get the current user profile image
  def get_current_user_profile_image
    if ProfileImage.find_by(user_id: get_current_user.id).image_base64 != ""
      return ProfileImage.find_by(user_id: get_current_user.id)
    else
      return "/img/logo/small-logo.png"
    end
  end

  not_found do
    erb :not_found
  end


end # END CLASS
