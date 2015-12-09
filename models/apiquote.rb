class APIQuotes
  require "httparty"
  include HTTParty
  base_uri 'https://theysaidso.p.mashape.com'
  headers "X-Mashape-Key" => ENV["QUOTE_API_KEY"]
  headers "Accept" => "application/json"

  def initialize
    quoteCategories = ["courage", "inspirational", "motivational", "hope", "dream", "strength", "success", "beauty"]

    @options = { query: {category: quoteCategories.sample, maxlength: 500} }
    # @headers = { headers: {
    # "Accept" => "application/json" } }
  end

  def get_data
    self.class.get("/quote?", @options)
  end

end
