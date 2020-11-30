module ApiResponder
  def api_response(object, status = :ok)
    render json: object, status: status
  end

  def api_page_response(resources, status = :ok)
    render json: { results: resources, page: page, per_page: per_page, total_entries: resources.count }, status: status
  end
end