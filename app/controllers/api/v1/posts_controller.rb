class Api::V1::PostsController < Api::V1::BaseController

  skip_before_action :verify_authenticity_token

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

  def create
    @response = SimpleCrudService.new(resource: resource).create

    api_response(@response)
  end

  def update
    @response = SimpleCrudService.new(resource: resource, resource_params: post_params).update

    api_response(@response)
  end

  protected

  def resource
    @post ||= params[:id] ? Post.find(params[:id]) : Post.new(post_params)
  end

  def resources
    @posts ||= Post.search(params)
                   .paginate({page: page, per_page: per_page})
  end

  private

  def post_params
    params.permit(:name, :title, :snippet, :content, :image)
  end

end
