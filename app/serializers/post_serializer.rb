class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :created_at

  def content
    "Custom content Header: #{object.content}"
  end
end
