class Api::V1::PostsController < Api::V1::BaseController
  include Api::BaseBehavior

  def index
    # authorize! :view, :company_shifts
    api_response(resources)
  end

  protected

  def resources
    @posts ||= Post.search(params)
                   .paginate({ page: page, per_page: per_page })
  end

end
