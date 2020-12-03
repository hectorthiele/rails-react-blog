require 'spec_helper'

describe Api::V1::PostsController, :type => :controller do

  let(:owner) { create(:user) }


  describe "#index"  do

    context "with remote results" do
      let(:external_api_result) { {
                                       id: SecureRandom.uuid,
                                       source: :remote,
                                       author: "Author name",
                                       created_at: DateTime.now,
                                       url_image: "",
                                       title: "Test title",
                                       snippet:"snippet",
                                       content:"content"
                                   }}
      before do
        allow_any_instance_of(SearchRemotePost).to receive(:perform).and_return(external_api_result)
        allow_any_instance_of(Post).to receive(:search).and_return([])
        get :index, format: 'json'
      end

      it { should respond_with :success }
      it "should render requisitions" do
        data = JSON.parse(response.body)
        expect(data['']).to eq("hola")
        # data['requisitions'].should be_present
        # data['requisitions'][0].should be_present
        # data['requisitions'][0]['id'].should == requisition.id
      end

        # get api_v1_posts_path, as: :as_json
        # assert_response :success
        # results = JSON.parse(self.response.body)
        #
        # assert_not_empty results, 'results is empty or not present'
        # assert_equal 'remote', results[0]["source"], 'The source is not remote'

    end

  end




  # context 'with authorized user' do
  #
  #
  #   describe "GET /api/v1/sales_account/:id" do
  #     let!(:sales_account) { create(:sales_account, { name: 'One account', sales_rep: sales_rep, organization: organization, sales_group: sales_group }) }
  #
  #     before do
  #       controller.should_receive(:can?).with(:read, an_instance_of(SalesAccount)).and_return(true)
  #       get :show, id: sales_account.id, include: 'sales-group', format: 'json'
  #     end
  #
  #     it { should respond_with :success }
  #
  #     it "should render sales_account" do
  #       data = JSON.parse(response.body)
  #       expect(data['sales_account']).to be_present
  #       expect(data['sales_account']['name']).to eq(sales_account.name)
  #       expect(data['sales_account']['sales_group']['id']).to eq(sales_group.id)
  #     end
  #   end
  #
  #   describe "GET /api/v1/sales_accounts" do
  #     let!(:sales_account) { create(:sales_account, { name: 'One account', sales_rep: sales_rep, organization: organization, sales_group: sales_group }) }
  #
  #     context 'without archived sales_account' do
  #       before do
  #         controller.should_receive(:can?).with(:read, an_instance_of(Organization)).and_return(true)
  #
  #         get :index, organization_id: organization.id, include: 'sales-group', format: 'json'
  #       end
  #
  #       it { should respond_with :success }
  #
  #       it "should render sales_accounts" do
  #         data = JSON.parse(response.body)
  #         expect(data['sales_accounts']).to be_present
  #         expect(data['sales_accounts'][0]['name']).to eq(sales_account.name)
  #         expect(data['sales_accounts'][0]['organization_id']).to eq(organization.id)
  #         expect(data['sales_accounts'][0]['sales_group']['id']).to eq(sales_group.id)
  #       end
  #     end
  #
  #     context 'with archived sales_account' do
  #       let!(:archived_sales_account) { create(:sales_account, { name: 'Another account', sales_rep: sales_rep, organization: organization }) }
  #       before do
  #         controller.should_receive(:can?).with(:read, an_instance_of(Organization)).and_return(true)
  #         archived_sales_account.archive
  #       end
  #
  #       it 'should not include archived sales account' do
  #         get :index, organization_id: organization.id, format: 'json'
  #
  #         data = JSON.parse(response.body)
  #         sales_account_ids = data['sales_accounts'].map { |sa| sa['id'].to_i }
  #         expect(sales_account_ids).not_to include(archived_sales_account.id)
  #       end
  #
  #       it 'should include archived sales account' do
  #         get :index, organization_id: organization.id, archived: "true", format: 'json'
  #
  #         data = JSON.parse(response.body)
  #         sales_account_ids = data['sales_accounts'].map { |sa| sa['id'].to_i }
  #         expect(sales_account_ids).to include(archived_sales_account.id)
  #       end
  #     end
  #
  #     context "with csv format" do
  #       before {
  #         allow(controller).to receive(:can?).with(:read, an_instance_of(Organization)).and_return(true)
  #       }
  #
  #       it "should render csv data" do
  #         get :index, organization_id: organization.id, format: 'csv'
  #
  #         expect(response.status).to eq 200
  #       end
  #     end
  #   end
  #
  #   describe "POST /api/v1/sales_accounts" do
  #
  #     before do
  #       controller.should_receive(:can?).with(:create, an_instance_of(SalesAccount)).and_return(true)
  #     end
  #
  #     context "with valid attributes" do
  #       let(:params) { { name: 'Jonny',
  #                        organization_id: organization.id,
  #                        sales_rep_id: sales_rep.id,
  #                        sales_group_id: sales_group.id
  #       } }
  #
  #       before { post :create, sales_account: params, format: 'json' }
  #
  #       it { should respond_with :created }
  #
  #       it "should create sales_account" do
  #         sales_account = SalesAccount.last
  #         expect(sales_account).to be_present
  #         expect(sales_account.name).to eq(sales_account.name)
  #         expect(sales_account.organization_id).to eq(sales_account.organization_id)
  #         expect(sales_account.sales_group_id).to eq(sales_group.id)
  #       end
  #     end
  #
  #     context "with invalid attributes" do
  #       let(:params) { { name: 'Two name' } }
  #
  #       before { post :create, sales_account: params, format: 'json' }
  #
  #       it { should respond_with :unprocessable_entity }
  #     end
  #   end
  #
  #   describe "PUT /api/v1/sales_accounts/1" do
  #     let(:sales_account) { SalesAccount.new({ name: 'Acc name',
  #                                              sales_rep_id: sales_rep.id,
  #                                              organization_id: organization.id }) }
  #
  #     before do
  #       sales_account.save!
  #       SalesAccount.stub_chain(:with_archived, :find).and_return(sales_account)
  #       controller.should_receive(:can?).with(:update, an_instance_of(SalesAccount)).and_return(true)
  #     end
  #
  #     context "with valid attributes" do
  #       let(:name) { 'New name' }
  #       let(:params) { { name: name,
  #                        sales_rep_id: sales_rep.id,
  #                        organization_id: organization.id } }
  #
  #       before { put :update, id: sales_account.id, sales_account: params, format: 'json' }
  #
  #       it { should respond_with :success }
  #
  #       it "should render sales_account" do
  #         data = JSON.parse(response.body)
  #         expect(data['sales_account']).to be_present
  #       end
  #
  #       it "should update sales account name" do
  #         expect(sales_account.name).to eq(name)
  #       end
  #
  #     end
  #   end
  # end
  #
  # context 'with authorized sales_rep without organization membership' do
  #   before do
  #     stub_user_hooks
  #     stub_auth0_hooks
  #     authentication_headers(user)
  #   end
  #
  #   describe "GET /api/v1/sales_accounts" do
  #     let(:sales_rep) { create(:sales_rep, { organization: organization, user: user }) }
  #     let(:another_user) { create(:user) }
  #     let(:child_group) { create(:sales_group, { name: 'Child group', parent: sales_group, organization: organization }) }
  #     let(:another_rep) { create(:sales_rep, { organization: organization, user: another_user, sales_group: child_group }) }
  #     let!(:sales_account) { create(:sales_account, { name: 'One account', sales_rep: sales_rep, organization: organization, sales_group: sales_group }) }
  #     let!(:child_sales_account) { create(:sales_account, { name: 'Child One account', sales_rep: another_rep, organization: organization, sales_group: child_group }) }
  #
  #     context 'with sales_rep sales_group manager' do
  #       let(:sales_rep) { create(:sales_rep, { organization: organization, user: user, is_group_manager: true, sales_group: sales_group }) }
  #       before do
  #         get :index, organization_id: organization.id, for_sales_portal: true, format: 'json'
  #       end
  #
  #       it { should respond_with :success }
  #
  #       it "should respond with sales account and it's children" do
  #         data = JSON.parse(response.body)
  #         expect(data['sales_accounts'].size).to eq 2
  #         expect(data['sales_accounts'][0]['id']).to eq sales_account.id
  #       end
  #     end
  #
  #     context 'with sales_rep non sales_group manager' do
  #       before do
  #         get :index, organization_id: organization.id, for_sales_portal: true, format: 'json'
  #       end
  #
  #       it { should respond_with :success }
  #
  #       it 'should respond with sales account' do
  #         data = JSON.parse(response.body)
  #         expect(data['sales_accounts'].size).to eq 1
  #         expect(data['sales_accounts'][0]['id']).to eq sales_account.id
  #       end
  #     end
  #
  #     context 'with physician contact for the organization for ordering' do
  #       let(:sales_account_contact) { create(:sales_account_contact, { organization: organization, sales_account: sales_account, user: user }) }
  #       let(:sales_account_contact2) { create(:sales_account_contact, { organization: organization, sales_account: sales_account, user: user }) }
  #       let(:physician) { create(:physician) }
  #       let(:physician_sales_account) { create(:physician_sales_account, { sales_account: sales_account, physician: physician }) }
  #       let(:physician_sales_account_contact) { create(:physician_sales_account_contact, { physician_sales_account: physician_sales_account, sales_account_contact: sales_account_contact }) }
  #
  #       before do
  #         physician_sales_account_contact.touch
  #         sales_account_contact2.touch
  #
  #         get :index, organization_id: organization.id, for_orders_portal: true, format: 'json'
  #       end
  #
  #       it { should respond_with :success }
  #
  #       it 'should respond with sales account' do
  #         data = JSON.parse(response.body)
  #         expect(data['sales_accounts'].size).to eq 1
  #         expect(data['sales_accounts'][0]['id']).to eq sales_account.id
  #       end
  #     end
  #   end
  # end
  #

end
