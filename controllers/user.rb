class UserController < ApplicationController
    # User login, register, and logout



    # shouldn't be able to get to this page, but in case, go to
    # the items class root
    get "/" do
      authorization_check
      @user_name = session[:current_user].user_name
      redirect "/users/profile_home"
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
        @message = "User already exists!"
        erb :register
        # return {:message => "user already exists"}.to_json
      end
      # if the form has been filled out properly
      # TODO: update this depending on the DB table!
      if (params[:user_email] != "" && params[:user_name] != "" && params[:password] != "")
        # make the user name
        user = Account.create(user_email: params[:user_email], user_name: params[:user_name], full_name: params[:full_name], password: params[:password] )
        # save into session control
        session[:current_user] = user
        # cookie can't hold the image base64, so put it in a separate table
        # if the user doesn't upload an image, use the small logo (in table as user_id => 0)
        if params[:image_base64] != ""
          profile_image = ProfileImage.create(user_id: get_current_user.id, image_base64: params[:image_base64])
        else
          tempImage = ProfileImage.find_by(user_id: 0).image_base64
          profile_image = ProfileImage.create(user_id: get_current_user.id, image_base64: tempImage)
        end
        # force the URL to the items root to show list
        redirect "/users/profile_home"
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
          redirect "/users/profile_home"
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
      redirect "/users/login"
    end

    post "/logout" do
      authorization_check
      session[:current_user] = nil
      redirect "/users/login"
    end



    # profile_view (main page where quote / images will be)
    get "/profile_home" do
      authorization_check
      # set variables for erb display
      @user_name = get_current_user.user_name.capitalize
      @image_base64 = get_current_user_profile_image.image_base64
      erb :profile_home
    end
    post "/profile_home" do
      authorization_check
      # set variables for erb display
      @user_name = get_current_user.user_name.capitalize
      @image_base64 = get_current_user_profile_image.image_base64
      erb :profile_home
    end

    # a searched user will show their favorites
    post "/profile_search" do
      authorization_check
      if does_user_exist(params[:user_name]) == true
        searched_user = Account.find_by(user_name: params[:user_name])
        profile_image = ProfileImage.find_by(user_id: searched_user.id)

        @user_name = searched_user.user_name.capitalize
        @image_base64 = profile_image.image_base64

        # grab the current_user id
        @user = searched_user.id
        # get all items tied to user id from DB
        @quotes = Quote.where(user_id: @user)
        erb :profile_search
      else
        @user_name = get_current_user.user_name.capitalize
        @image_base64 = get_current_user_profile_image.image_base64
        @message = "The username " + params[:user_name] + " doesn't exist!"
        erb :profile_home
      end
    end

end # CLASS END
