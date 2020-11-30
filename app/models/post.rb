class Post < ApplicationRecord

  scope :ordered, -> { order(:title) }

  class << self
    def search(params = {})
      scope = ordered
      # scope = scope.with_archived if params[:archived] == "true"
      scope = scope.filter(params[:filter]) if params[:filter].present?
      scope
    end

    def filter(params)
      scope = where({})
      term = "%#{param[:title]}%"
      scope = scope.where("title LIKE ", term) if params[:title].present?
      scope
    end
  end
end
