import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

  Route.get('/', async () => {
    return { hello: 'world' }
  })

  Route.post('/login', 'AuthController.auth')

  Route.post('/user', 'UsersController.store')

  Route.resource('/password', 'PasswordsController').apiOnly().middleware({
    '*': ['auth'],
  })
  
}).prefix('/api')
