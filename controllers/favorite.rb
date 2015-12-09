class FavoriteController < ApplicationController
# it's our favorite!

  # add quote to Quotes table (favorites)
  post "/quote" do
    current_user = Account.find_by(user_name: session[:current_user].user_name)
    quote = Quote.create(user_id: current_user.id, quote: params[:quote], author: params[:author] )
    redirect "/users/profile_home"
  end

  post "/quotes" do
    # grab the current_user id
    @user = session[:current_user].id
    # get all items tied to user id from DB
    @quotes = Quote.where(user_id: @user)

    current_user = Account.find_by(user_name: session[:current_user].user_name)
    profile_image = ProfileImage.find_by(user_id: current_user.id)

    @user_name = current_user.user_name.capitalize
    @image_base64 = profile_image.image_base64
    erb :profile_favorites
  end


end # CLASS END
