class Api::V1::PostsController < Api::V1::BaseController
  include Api::BaseBehavior

  def index
    # authorize! :view, :company_shifts

    remote_search = SearchRemotePost.new
    response = resources.as_json
    response += remote_search.perform
    response.sort_by { |post| post['created_at'].to_s }
    api_response(response)
  end

  def show
    api_response(resource)
  end

  protected

  def resource
    @post ||= Post.find(params[:id])
  end

  def resources
    @posts ||= Post.search(params)
                   .paginate({ page: page, per_page: per_page })
  end

end
