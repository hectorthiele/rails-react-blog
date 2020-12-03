class Post < ApplicationRecord
  mount_uploader :image, ImageUploader

  validates :title, :snippet, :content, presence: true
  validates :title, length: { minimum: 10, maximum: 300 }, allow_blank: false
  validates :snippet, length: { minimum: 10, maximum: 300 }, allow_blank: false
  validates :content, length: { minimum: 10 }, allow_blank: false
  scope :ordered, -> { order(:created_at) }

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
      scope = scope.where('title LIKE ', term) if params[:title].present?
      scope
    end
  end
end
