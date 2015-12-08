class APIController < ApplicationController


  # call the pixabay API through the server
  get "/pixabay" do
    pixabay = Pixabay.new(ENV["PIXABAY_API_KEY"], '(inspire OR inspiration OR inspirational) OR (motivation OR motivational)', "photo", 100, "horizontal")
    data = (pixabay.get_data).to_json
    return data
  end




  # call the quotes API through the server
  get "/quotes" do
    quotes = Quotes.new
    data = (quotes.get_data).to_json
    return data
  end






end # CLASS END
