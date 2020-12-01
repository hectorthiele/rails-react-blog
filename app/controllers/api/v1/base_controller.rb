module Api::V1
  class BaseController < ApplicationController
    include ApiResponder
    include ApiExceptionHandler

    # before_action :authenticate_user!

    protected

    def page
      (params[:page] || 1).to_i
    end

    def per_page
      (params[:per_page] || 10).to_i
    end

  end
end