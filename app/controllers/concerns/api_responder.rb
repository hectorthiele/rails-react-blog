module ApiResponder
  def api_response(object, status = :ok)
    render json: object, status: status
  end

  def api_page_response(resources, status = :ok)

    # render json: resources, status: status
    render json: {
        results: resources,
        meta: { page: page, per_page: per_page,  total_entries: resources.count }
    }, each_serializer: serializer, status: status
  end
end