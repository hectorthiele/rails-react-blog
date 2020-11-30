class Api::V1::PostsController < Api::V1::BaseController

  def index
    # authorize! :view, :company_shifts
    api_page_response(posts)
  end


  protected

  def posts
    @posts ||= Post.search(params)
                   .paginate({ page: page, per_page: per_page })
  end

end
