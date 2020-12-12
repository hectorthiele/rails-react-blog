# Rails + React Blog

It's a small project that shows how we can integrate React with Ruby on Rails.
We are using the next gems that allow us to do it.
    
    gem 'react-rails'
    gem 'webpacker'
    
-----
##### What does this project do?
It is a small blog that allows the user to see posts in the dashboard and create and/or edit posts. 
Those posts are considered **Local Posts**

The app also shows remote posts that come from the API of https://newsapi.org/.
Those posts are considered **Remote Posts**

Each post has a tag that indicates if is a **Local** or **Remote** post

You can create posts and select one image for it. It will be displayed in the dashboard and into the post show.

-----
### Getting Started

1. Clone the repo
 
       ~ git clone https://github.com/hectorthiele/rails-react-blog.git

2. Browse the project directory:

        ~ cd rails-react-blog
        
3. Configure your **database.yml** using your database credentials:

4. Install the gems

        ~ bundle install
        
5. Run the migrations

        ~ rake db:create
        ~ rake db:migrate

6. Run the Project

        ~ rails s
        
#### Specs

This project has some specs that you can run with the next command line

        ~ bundle exec rspec
        
#### Tools

This project has installed **rubocop** gem that analyzes the code of the application.

You can run that opening the project in a command line and execute

        ~ rubocop
        


        
        





