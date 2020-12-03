module ApiExceptionHandler
  # provides the more graceful `included` method
  extend ActiveSupport::Concern

  included do

    rescue_from StandardError do |e|
      logger.error e
      logger.error e.backtrace.join("\n")
      api_response(e.backtrace.join("\n"));
      # api_response({ errors: I18n.t('activerecord.messages.generic_error') }, :internal_server_error)
    end

    rescue_from CustomException do |e|
      logger.error e
      logger.error e.backtrace.join("\n")
      api_response({ errors: e.message }, :bad_request)
    end

    rescue_from ArgumentError do |e|
      logger.error e
      logger.error e.backtrace.join("\n")
      api_response({ errors: I18n.t('activerecord.messages.generic_error') }, :bad_request)
    end

    rescue_from ActiveRecord::RecordNotFound do |e|
      api_response({ errors: e.message }, :not_found)
    end

    rescue_from ActiveRecord::RecordInvalid do |e|
      logger.error e.record.errors.full_messages
      api_response({ errors: e.record.errors }, :unprocessable_entity)
    end
  end
end