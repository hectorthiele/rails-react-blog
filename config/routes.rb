Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'home#index'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :posts, only: %i[index show create update]
    end
  end

  get '*path', to: 'home#index'
end
