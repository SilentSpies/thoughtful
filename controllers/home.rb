class HomeController < ApplicationController
  # Basic routes



  # directly route to the login page
  get "/" do
    erb :login
  end



  # show the not authorized page
  get "/not_authorized" do
    erb :not_authorized
  end

  get "/not_found" do
    erb :not_found
  end


  # for all pages, if not found show the not_found
  not_found do
    erb :not_found
  end


end # CLASS END
