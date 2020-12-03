class AddSnippetToPost < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :snippet, :string
  end
end
