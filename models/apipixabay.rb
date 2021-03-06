class APIPixabay
  require "httparty"
  include HTTParty
  base_uri 'https://pixabay.com'

  def initialize(api_key, queryStr, imageType, perPage, orientation, safesearch)
    @options = { query: {key: api_key, q: queryStr, image_type: imageType, per_page: perPage, orientation: orientation, safesearch: safesearch} }
  end

  def get_data
    self.class.get("/api/?", @options)
  end

end
