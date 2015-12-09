class APIController < ApplicationController


  # call the pixabay API through the server
  get "/pixabay" do
    pixabay = APIPixabay.new(ENV["PIXABAY_API_KEY"], '(inspire OR inspiration OR inspirational OR motivation OR motivational OR hope OR dream)', "photo", 100, "horizontal")
    data = (pixabay.get_data).to_json
    return data
  end

  get "/pixabaySearch" do
    words = params['search'].split("-").join(" OR ")
    pixabay = APIPixabay.new(ENV["PIXABAY_API_KEY"], '(insp* OR motiv* OR hope OR dream) AND (' + words + ')' , "photo", 200, "horizontal")
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
