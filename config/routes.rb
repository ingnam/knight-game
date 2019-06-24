Rails.application.routes.draw do
  root 'pages#index'
  get 'help', to: 'move_assistant#index'
end
