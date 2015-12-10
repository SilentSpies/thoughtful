# thoughtful
Thoughtful: Be Inspired App




### Check these out:
* Wireframes and ERD -  https://drive.google.com/open?id=1Q0SgoOWThzPv90nJdAsx9NXS9m0Pkh16p4kF3Mq-JUs
* Prototype - https://invis.io/9857GMUCT
* User Stories - https://github.com/SilentSpies/thoughtful/blob/master/README-UserStories.md


### Screenshots
<p align="center">
  <img src="https://github.com/SilentSpies/thoughtful/blob/master/public/img/logo/thoughtful-logo-4.png" alt="thoughtful: be inspired"/>
  <img src="https://github.com/SilentSpies/thoughtful/blob/master/screenshots/thoughtful-home&login.png" alt="thoughtful: be inspired - Home & Login View"/>
  <img src="https://github.com/SilentSpies/thoughtful/blob/master/screenshots/thoughtful-profilehome.png" alt="thoughtful: be inspired - Home & Login View"/>
  <img src="https://github.com/SilentSpies/thoughtful/blob/master/screenshots/thoughtful-favorites.png" alt="thoughtful: be inspired - Home & Login View"/>
</p>

### Technology:
* HTML & CSS
* Embedded Ruby for View management
* Sinatra - MVC and Sessions
* Postgresql - Database management
* BCrypt - User Authentication
* HTTParty - API Calling
* JSON - API Dealing
* DOTENV - Hiding API Keys
* Skeleton - Basic CSS Framework
* BXSlider - Image Carousel - http://bxslider.com/
* CSS Button Generator - Delete Button - http://css3buttongenerator.com/
* Base64 FileReader - Encoding of Images to text

### Approach:
* Ruby Controllers
  * ApplicationController - connect to the database and hold helper functions
  * HomeController - control the root landing page
  * UserController - contain routes for user creation, log on/off
  * ItemsController - contain routes that interface with the database (create, read, update, destroy)

### Installation:
Install on your local system
* Setting up the Database
  * Required: Postgresql (http://www.postgresql.org/)
  * Run the commands in `migration.sql` -> `db/migrations.sql` to initialize the DB and tables
  * Run the commands in `seed.sql` -> `db/migrations.sql` to create the default profile image
* Preparing for a HTTParty
  * Within the root `thoughtful` folder, run `bundle` from the terminal. This will prepare/install the necessary gems for this project. If they are all successful, continue on...
  * Again from the root `thoughtful` folder, run `bundle exec rackup` to start this HTTParty!
* Check it out
  * In your favorite browser, go to `localhost:9292`

Install on Digital Ocean
* Create Droplet
  * Set name of droplet ... `thoughtful`
  * Choose plan ... $5/month
  * Choose region ... America
  * Choose Distribution ... Ubuntu
  * Click CREATE
* Config that Server!
  * Once the email from Digital Ocean arrives, keep note of the IP address and password, you will need those in the next steps.
  * 


### Unsolved Problems:
* Social Sharing
* Log in with Facebook / Google+ / etc - Facebook requires app approval
* API Call Delay - Slight delay when looking at Profile Home, pulling in the quote and images takes time
