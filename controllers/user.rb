class UserController < ApplicationController
    # User login, register, and logout



    # shouldn't be able to get to this page, but in case, go to
    # the items class root
    get "/" do
      authorization_check
      @user_name = session[:current_user].user_name
      @PIXABAY_API_KEY = ENV["PIXABAY_API_KEY"]
      puts @PIXABAY_API_KEY
      @QUOTE_API_KEY = ENV["QUOTE_API_KEY"]
      erb :profile_home
    end



    get "/not_authorized" do
      erb :not_authorized
    end




    # user registration
    get "/register" do
      erb :register
    end
    post "/register" do
      # check if the user name already exists
      if does_user_exist(params[:user_name]) == true
        return {:message => "user already exists"}.to_json
      end
      # if the form has been filled out properly
      # TODO: update this depending on the DB table!
      if (params[:user_email] != "" && params[:user_name] != "" && params[:password] != "")
        # make the user name
        user = Account.create(user_email: params[:user_email], user_name: params[:user_name], password: params[:password])
        # save into session control
        session[:current_user] = user
        # force the URL to the items root to show list
        erb :profile_home
      else
        @message = "All fields must have a value"
        erb :register
      end
    end



    # user login
    get "/login" do
      erb :login
    end
    post "/login" do
      if (does_user_exist(params[:user_name]) == true &&
         params[:password] != "")
        # Authenticate user for login
        user = Account.authenticate(params[:user_name], params[:password])
        if user
          session[:current_user] = user
          erb :profile_home
        else
          # TODO: improve error msg - something like bootstrap's forms
          @message = "Your password or account information is incorrect"
          erb :login
        end
      else
        redirect "/users/login"
      end
    end



    # logout
    get "/logout" do
      authorization_check
      session[:current_user] = nil
      redirect "/"
    end

    post "/logout" do
      authorization_check
      session[:current_user] = nil
      redirect "/"
    end

    # profile_view (main page where quote / images will be)
    get "/profile_home" do
      erb :profile_home
    end

end # CLASS END
