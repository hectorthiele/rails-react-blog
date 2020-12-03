module Api::V1
  class BaseController < ApplicationController
    include ApiResponder
    include ApiExceptionHandler

    protected

    # Utils to be uses with paginate
    def page
      (params[:page] || 1).to_i
    end

    def per_page
      (params[:per_page] || 10).to_i
    end
  end
end
