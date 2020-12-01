class Api::V1::PostsController < Api::V1::BaseController
  include Api::BaseBehavior

  def index
    # authorize! :view, :company_shifts
    api_response(resources)
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
