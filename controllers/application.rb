class ApplicationController < Sinatra::Base

  require "bundler"
  Bundler.require

  require "dotenv"
  Dotenv.load

  ActiveRecord::Base.establish_connection(
    :adapter => "postgresql",
    :database => "thoughtful_db" # TODO: what is the DB name?
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
      redirect "/login"
    else
      return true
    end
  end


  # get ENV variables
  def get_ENV_variable_string(variable_name)
    return ENV[variable_name];
  end


end # END CLASS
