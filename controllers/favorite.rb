class FavoriteController < ApplicationController
# it's our favorite!


  # add quote to Quotes table (favorites)
  post "/quote" do
    authorization_check
    # save the quote into the table
    quote = Quote.create(user_id: get_current_user.id, quote: params[:quote], author: params[:author] )
    redirect "/users/profile_home"
  end


  # show the favorite quotes
  get "/quotes" do
    authorization_check
    # grab the current_user id
    @user = session[:current_user].id
    # get all items tied to user id from DB
    @quotes = Quote.where(user_id: @user)

    @user_name = get_current_user.user_name.capitalize
    @image_base64 = get_current_user_profile_image.image_base64
    erb :profile_favorites
  end


  # show the favorite quotes
  post "/quotes" do
    authorization_check
    # grab the current_user id
    @user = session[:current_user].id
    # get all items tied to user id from DB
    @quotes = Quote.where(user_id: @user)

    @user_name = get_current_user.user_name.capitalize
    @image_base64 = get_current_user_profile_image.image_base64
    erb :profile_favorites
  end


  # delete the quote (from id) from the table
  post "/quote-delete/:id" do
    authorization_check
    # find the item row by id and destroy (remove from DB)
    @quote = Quote.find(params[:id])
    @quote.destroy
    # show the view
    redirect "/users/profile_home"
  end


end # CLASS END
