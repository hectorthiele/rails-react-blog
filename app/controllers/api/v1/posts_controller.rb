module Api
  module V1
    class PostsController < Api::V1::BaseController
      before_action :set_post, only: %i[show update]
      skip_before_action :verify_authenticity_token

      def index
        remote_search = SearchRemotePost.new
        response = resources.as_json
        response += remote_search.perform
        response.sort_by { |post| post['created_at'].to_s }
        api_response(response)
      end

      def show
        api_response(@post)
      end

      def create
        @post = Post.create!(post_params)
        api_response(@post, :created)
      end

      def update
        response = @post.update!(post_params)
        if response
          api_response(@post)
        else
          api_response(response)
        end
      end

      protected

      def set_resource
        @post ||= Post.find(params[:id])
      end

      def resources
        @posts ||= Post.search(params)
        # .paginate({page: page, per_page: per_page})
      end

      private

      def post_params
        params.permit(:title, :snippet, :content, :image)
      end
    end
  end
end
