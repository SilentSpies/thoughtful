# thoughtful
### [Thoughtful: Be Inspired App](http://thoughtful.website/) <--- Click me!
<br>
<br>


### Screenshots:
<p align="center">
  <img src="https://github.com/SilentSpies/thoughtful/blob/master/public/img/logo/thoughtful-logo-4.png" alt="thoughtful: be inspired"/>
  <br>
  <img width="400px" src="https://github.com/SilentSpies/thoughtful/blob/master/screenshots/thoughtful-home&login.png" alt="thoughtful: be inspired - Home & Login View"/>
  <br>
  <img width="400px" src="https://github.com/SilentSpies/thoughtful/blob/master/screenshots/thoughtful-profilehome.png" alt="thoughtful: be inspired - Home & Login View"/>
  <br>
  <img width="400px" src="https://github.com/SilentSpies/thoughtful/blob/master/screenshots/thoughtful-favorites.png" alt="thoughtful: be inspired - Home & Login View"/>
</p>

### Technology:
* HTML, CSS, JavaScript, jQuery
* Embedded Ruby for View management
* Sinatra - MVC and Sessions
* Postgresql - Database management
* BCrypt - User Authentication
* HTTParty - API Calling
* JSON - API Dealing
* DOTENV - Hiding API Keys
* Skeleton - Basic CSS Framework
* [BXSlider](http://bxslider.com/) - Image Carousel
* [CSS Button Generator](http://css3buttongenerator.com/) - Delete Button
* Base64 FileReader - Encoding of Images to text
* [invision](http://invisionapp.com) - Basic Prototype
* Google Draw - Wireframes / ERD

### Links:
* [Wireframes and ERD](https://drive.google.com/open?id=1Q0SgoOWThzPv90nJdAsx9NXS9m0Pkh16p4kF3Mq-JUs)
* [Prototype](https://invis.io/9857GMUCT)
* [User Stories](https://github.com/SilentSpies/thoughtful/blob/master/README-UserStories.md)
* Live App - [thoughtful: be inspired](http://thoughtful.website/)

### Approach:
* Ruby Controllers
  * ApplicationController - connect to the database and hold helper functions
  * HomeController - control the root landing page
  * UserController - contain routes for user creation, log on/off
  * APIController - contain routes that direct the correct commands/formating to the CLASSes APIPixabay and APIQuotes
  * FavoriteController - controls the saving and serving of favorited quotes
* Brainstorm -> Conception -> Deployment
  * Brainstorming and Wireframing:
    * After discussing a few ideas, the topic of an inspirational based app was decided upon. With that basic topic defined, the discussion focused to potential attributes of the app; specifically what we wanted it to do. While thinking this through, [wireframes](https://drive.google.com/open?id=1Q0SgoOWThzPv90nJdAsx9NXS9m0Pkh16p4kF3Mq-JUs) were hand-sketched and the digitized. A [prototype](https://invis.io/9857GMUCT) was also generated for more visuals.
  * Flesh out the idea / Basic building blocks:
    * In tandem we fleshed out the basic idea through user stories to determine the minimal viable product (MVP) as well as created the folder structure and base files to build the app from (Sinatra base with Controllers).
  * Layout for Design / Layout for Backend
    * Continuing to work in tandem, the base visual design was created on top of the previously created templates while the database and basic routes were expanded. Creating these templates allowed both teammates to build up the client side and server side without greatly affecting each others progress.
  * Applying Content
    * With the bones of the app together and working, both the visual design and javascript were focused on while adding server-side routes as necessary. This portion took the majority of the time to implement. Although there were no major issues, extra planning was required to integrate successfully.
  * Bugs / Polish
    * The last portion, up to the submission of the project, was spent finding the random bugs, catching errors, and final touches on the client side.


### Installation:
**Install on your local system**
* *Git* the files
  * Fork the repository and `git clone` to your local system
* Setting up the Database
  * Required: Postgresql (http://www.postgresql.org/)
  * Run the commands in `migration.sql` -> `db/migrations.sql` to initialize the DB and tables
  * Run the commands in `seed.sql` -> `db/migrations.sql` to create the default profile image
* Preparing for a HTTParty
  * Within the root `thoughtful` folder, run `bundle` from the terminal. This will prepare/install the necessary gems for this project. If they are all successful, continue on...
  * Again from the root `thoughtful` folder, run `bundle exec rackup` to start this HTTParty!
* Check it out
  * In your favorite browser, go to `localhost:9292`

**Install on Digital Ocean**
* Create Droplet
  * Set name of droplet ... `thoughtful`
  * Choose plan ... $5/month
  * Choose region ... America
  * Choose Distribution ... Ubuntu
  * Click CREATE
* Config that Server!
  * Once the email from Digital Ocean arrives, keep note of the IP address and password, you will need those in the next steps.
  * On the terminal, access the server by `ssh root@123.123.123.123` using the IP sent by Digital Ocean.
  * Answer yes to the authenticity alert
  * Enter the provided password (twice) and setup a new password
  Use the following commands
  ```
  apt-get update
  # updates the list of software our server knows about

  apt-get install ruby-dev -Y
  # installs the tools we need for a ruby environment

  apt-get install build-essential -Y
  # essential build tools such as GCC

  apt-get install git -Y
  # git for github

  # postgres database
  apt-get install postgresql -Y
  apt-get install postgresql-contrib -Y  
  apt-get install libpq-dev
  gem install pg

  # create a user
  createdb $USER
  touch ~/.psql_history

  # gems
  apt-get install ruby -y
  gem install json
  gem install bundler
  gem install sinatra
  gem install httparty
  gem install dotenv
  ```
  * From the terminal, we need to create a `.env` file that holds the API and database name
    * send the command `touch .env` to create the file
    * send the command `nano .env` to open the file in the command-line editor
    * Set your keys names appropriately like below
      ```
      PIXABAY_API_KEY="api-key-here"
      QUOTE_API_KEY="api-key-here"
      DB_name="database_name"
      ```
  * From github, fork to your repositories and `git clone` the repository to the server (use the HTTP link)
  * Setting up the Database
    * Required: [Postgresql](http://www.postgresql.org/)
    * Run the commands in `migration.sql` -> `db/migrations.sql` to initialize the DB and tables
    * Run the commands in `seed.sql` -> `db/migrations.sql` to create the default profile image
  * Preparing for a HTTParty
    * Within the root `thoughtful` folder, run `bundle` from the terminal. This will prepare/install the necessary gems for this project. If they are all successful, continue on...
    * Again from the root `thoughtful` folder, run `bundle exec rackup -p 80 --host 0.0.0.0` to start this HTTParty!
  * Check it out
    * In your favorite browser, go to the IP address provided by DigitalOcean!
    * To keep the server running after disconnecting, run `nohup bundle exec rackup -p 80 --host 0.0.0.0`


### Unsolved Problems:
* Social Sharing (Tweeting implemented)
* Log in with Facebook / Google+ / etc - Facebook requires app approval
* API Call Delay - Slight delay when looking at Profile Home, pulling in the quote and images takes time
* Improvements on mobile responsive-ness

[David Beeler](https://github.com/mrbeewer) & [Jan Christian Bernabe](https://github.com/spramp)

December 11, 2015
