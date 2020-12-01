module Api
  module BaseBehavior
    extend ActiveSupport::Concern

    def index
      options = {}

      # if serializer
      #   options[:each_serializer] = serializer
      # end

      if resources.respond_to?(:total_entries)
        options[:meta] = {
            current_page:  resources.current_page,
            per_page:      resources.per_page,
            total_entries: resources.total_entries
        }
      end

      respond_to resources, options
    end

    def show
      respond_with *resource, serializer: serializer
    end

    def create
      resource.last.save
      ::Rails.logger.error("Error: #{resource.last.errors.inspect}") if resource.last.errors.present?
      respond_with *resource
    end

    def update
      resource.last.update_attributes(resource_params)
      ::Rails.logger.error("Error: #{resource.last.errors.inspect}") if resource.last.errors.present?
      respond_with *resource
    end

    def destroy
      resource.last.destroy
      respond_with *resource
    end
  end
end
