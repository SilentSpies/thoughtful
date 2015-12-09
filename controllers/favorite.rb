class FavoriteController < ApplicationController
# it's our favorite!

  # add quote to Quotes table (favorites)
  post "/quote" do
    current_user = Account.find_by(user_name: session[:current_user].user_name)
    quote = Quote.create(user_id: current_user.id, quote: params[:quote], author: params[:author] )
    redirect "/users/profile_home"
  end


end # CLASS END
