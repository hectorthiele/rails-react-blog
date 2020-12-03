require 'spec_helper'

describe Api::V1::PostsController, :type => :controller do
  describe '#index' do
    context 'with remote results' do
      let(:external_api_result) {
        {
          id: SecureRandom.uuid,
          source: :remote,
          author: 'Author name',
          created_at: DateTime.now,
          url_image: '',
          title: 'Test title',
          snippet: 'snippet',
          content: 'content'
        }
      }
      before do
        allow_any_instance_of(SearchRemotePost).to receive(:perform).and_return([external_api_result])
        allow_any_instance_of(Post).to receive(:search).and_return([])
        get :index, format: 'json'
      end

      it { should respond_with :success }
      it 'should return remote post' do
        data = JSON.parse(response.body)
        expect(data).to be_present
        expect(data[0]['source']).to eq('remote')
      end
    end

    context 'with local results' do
      let(:title) { 'Title customized' }
      let!(:post) { create(:post, { title: title }) }

      before do
        allow_any_instance_of(SearchRemotePost).to receive(:perform).and_return([])
        get :index, format: 'json'
      end

      it { should respond_with :success }
      it 'should return local post' do
        data = JSON.parse(response.body)
        expect(data).to be_present
        expect(data[0]['source']).to eq(nil)
        expect(data[0]['title']).to eq(title)
      end
    end

    context 'with local and remote results' do
      let(:title) { 'Title customized' }
      let!(:post) { create(:post, { title: title }) }
      let(:external_api_result) {
        {
          id: SecureRandom.uuid,
          source: :remote,
          author: 'Author name',
          created_at: DateTime.now,
          url_image: '',
          title: 'Test title',
          snippet: 'snippet',
          content: 'content'
        }
      }

      before do
        allow_any_instance_of(SearchRemotePost).to receive(:perform).and_return([external_api_result])
        get :index, format: 'json'
      end

      it { should respond_with :success }
      it 'should return local and remote post' do
        data = JSON.parse(response.body)
        expect(data).to be_present
        expect(data.length).to eq(2)
      end
    end
  end

  describe '#create' do
    let(:params) { { title: 'title title', snippet: 'text text text', content: 'content content' } }

    before do
      post :create, params: params, format: 'json'
    end

    it { should respond_with :created }
    it 'should create a new record' do
      expect(Post.count).to eq(1)
    end
  end

  describe '#update' do
    let!(:post) { create(:post) }
    let(:new_title) { 'New Title created' }
    before do
      post.title = new_title
      put :update, params: post.attributes, format: 'json'
    end

    it { should respond_with :success }
    it 'should update the record' do
      expect(Post.last.title).to eq(new_title)
      expect(Post.count).to eq(1)
    end
  end
end
