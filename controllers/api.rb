class APIController < ApplicationController


  # call the pixabay API through the server
  #   this is the default search WITHOUT extra search terms
  get "/pixabay" do
    pixabay = APIPixabay.new(ENV["PIXABAY_API_KEY"], '(inspire OR inspiration OR inspirational OR motivation OR motivational OR hope OR dream)', "photo", 100, "horizontal", true)
    data = (pixabay.get_data).to_json
    return data
  end


  # call the pixabay API through the server
  #   this is the default search WITH extra search terms
  get "/pixabaySearch" do
    words = params['search'].split("-").join(" OR ")
    pixabay = APIPixabay.new(ENV["PIXABAY_API_KEY"], '(insp* OR motiv* OR hope OR dream) AND (' + words + ' OR inspir*)' , "photo", 200, "horizontal", true)
    data = (pixabay.get_data).to_json
    return data
  end


  # call the quotes API through the server
  get "/quotes" do
    quotes = APIQuotes.new
    data = (quotes.get_data).to_json
    return data
  end


end # CLASS END
