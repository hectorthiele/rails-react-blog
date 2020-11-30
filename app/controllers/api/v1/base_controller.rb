module Api::V1
  class BaseController < ApplicationController
    include ApiResponder
    include ApiExceptionHandler

    # before_action :authenticate_user!

    protected

    def page
      params[:page].to_i || 1
    end

    def per_page
      params[:per_page].to_i || 10
    end

  end
end