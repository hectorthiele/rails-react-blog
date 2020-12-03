require 'net/https'
require 'uri'
require 'json'

class SearchRemotePost
  attr_reader :search_text

  def initialize(search_text = 'watches')
    @search_text = search_text
  end

  SEARCH_KEY = 'whatches'

  def perform
    endpoint = news_api_endpoint
    uri = URI("#{endpoint}?q=#{URI.escape(search_text)}")
    puts 'URI: '
    puts uri

    request = Net::HTTP::Get.new(uri)
    request['X-Api-Key'] = news_api_key

    response = Net::HTTP.start(uri.host, uri.port, use_ssl: uri.scheme == 'https') do |http|
      http.request(request)
    end
    puts 'Response request '
    puts JSON.parse(response.body)
    data = JSON.parse(response.body)
    normalize_resource(data)
  end

  def normalize_resource(data)
    results = []
    (data['articles'] || []).each do |result|
      result_data = {}
      result_data[:id] = SecureRandom.uuid
      result_data[:source] = :remote
      result_data[:author] = result['author']
      result_data[:created_at] = result['publishedAt']
      result_data[:url_image] = result['urlToImage']
      result_data[:title] = result['title']
      result_data[:snippet] = result['description']
      result_data[:content] = result['content']
      result_data[:url] = result['url']

      results << result_data
    end
    results
  end

  def news_api_endpoint
    'https://newsapi.org/v2/everything'
  end

  def news_api_key
    ENV['NEWS_API_KEY'] || '41edc4f0a47d41539a3e8c30408c7699'
  end
end
