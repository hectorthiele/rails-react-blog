class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :snippet, :content, :created_at

  def snippet
    "#{object.content[0...100]}..."
  end
end
