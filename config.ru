require 'sinatra/base'

require('./controllers/application')
require('./controllers/home')
require('./controllers/user')
require('./models/account')

map('/') { run HomeController }
map('/users') { run UserController }
