require 'sinatra/base'

require('./controllers/application')
require('./controllers/home')
require('./controllers/user')
require('./controllers/api')
require('./controllers/favorite')
require('./models/account')
require('./models/profile_image')
require('./models/apipixabay')
require('./models/apiquote')
require('./models/quote')

map('/') { run HomeController }
map('/users') { run UserController }
map('/api') { run APIController }
map('/favorite') { run FavoriteController }
