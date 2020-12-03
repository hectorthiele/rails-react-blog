require 'spec_helper'

describe Post do

  it { should validate_length_of(:title).is_at_most(300) }
  it { should validate_presence_of :title }
  it { should validate_presence_of :snippet }
  it { should validate_presence_of :content }

  describe 'search' do

    let!(:post) { create(:post)}

    it 'should return the post' do
      result = Post.search()
      expect(result.count).to eq(1)
      expect(result.first).to eq(post)
    end
  end
end
