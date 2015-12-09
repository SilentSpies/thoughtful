require 'sinatra/base'

require('./controllers/application')
require('./controllers/home')
require('./controllers/user')
require('./controllers/api')
require('./models/account')
require('./models/profile_image')
require('./models/pixabay')
require('./models/quote')

map('/') { run HomeController }
map('/users') { run UserController }
map('/api') { run APIController }
