class SimpleCrudService
  attr_reader :data, :resource, :resource_name, :logger

  def initialize(data)
    @data = data
    @resource = data[:resource]
    @resource_name = @resource.model_name.human
    @logger = Rails.logger
  end

  def create
    begin
      if resource.save
        Success.new(resource, I18n.t('activerecord.messages.save_success', resource: resource_name))
      else
        Error.new(resource, I18n.t('activerecord.messages.save_error', resource: resource_name, errors: resource.errors.to_a.to_sentence))
      end
    rescue => e
      logger.error e
      generic_error
    end
  end

  def update
    begin
      if resource.update(data[:resource_params])
        Success.new(resource, I18n.t('activerecord.messages.update_success', resource: resource_name))
      else
        Error.new(resource, I18n.t('activerecord.messages.update_error', resource: resource_name, errors: resource.errors.to_a.to_sentence))
      end
    rescue => e
      logger.error e
      generic_error
    end
  end


  def destroy
    begin
      if resource.destroy
        Success.new(resource, I18n.t('activerecord.messages.delete_success', resource: resource_name))
      else
        Error.new(resource, I18n.t('activerecord.messages.delete_error', resource: resource_name, errors: resource.errors.to_a.to_sentence))
      end
    rescue => e
      logger.error e
      generic_error
    end
  end

  private

  def generic_error
    Error.new(resource, I18n.t('activerecord.messages.generic_error'))
  end

end