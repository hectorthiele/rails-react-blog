ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'
require 'mocha/minitest'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
end

module SearchMock
  def extenal_api_results
    [
      {
        id: SecureRandom.uuid,
        source: :remote,
        author: 'Author name',
        created_at: DateTime.now,
        url_image: '',
        title: 'Test title',
        snippet: 'snippet',
        content: 'content'
      }
    ]
  end
end
