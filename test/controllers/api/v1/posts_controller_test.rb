require 'test_helper'

class Api::V1::PostsControllerTest < ActionDispatch::IntegrationTest
  include SearchMock

  test "should return results for external api" do
    SearchRemotePost.any_instance.stubs(:perform).returns(extenal_api_results)
    Post.any_instance.stubs(:search).returns([])
    get api_v1_posts_path, as: :as_json
    assert_response :success
    results = JSON.parse(self.response.body)

    assert_not_empty results, 'results is empty or not present'
    assert_equal 'remote', results[0]["source"], 'The source is not remote'
  end

  test "should return results for local database" do
    post =  Post.create!({ title: "Title title title", snippet: "snippet snippet snippet", content: "content content content" })
    SearchRemotePost.any_instance.stubs(:perform).returns([])
    get api_v1_posts_path, as: :as_json
    assert_response :success
    results = JSON.parse(self.response.body)

    assert_not_empty results, 'results is empty or not present'
    assert_equal post.title, results[0]["title"], 'The source is not remote'
  end

  test "should return local and remote posts" do
    post =  Post.create!({ title: "Title title title", snippet: "snippet snippet snippet", content: "content content content" })
    SearchRemotePost.any_instance.stubs(:perform).returns(extenal_api_results)
    get api_v1_posts_path, as: :as_json
    assert_response :success
    results = JSON.parse(self.response.body)

    assert_not_empty results, 'results is empty or not present'
    assert_equal 2, results.length, 'The posts returned not match'
  end

end
