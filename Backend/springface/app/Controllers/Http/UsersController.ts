import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['username', 'password'])
    const exists = await User.findBy('username', data.username)

    if (exists){
      response.status(400)
      return {
        msg: 'Usuario já existe no Sistema'
      }
    }else{
      response.status(201)
      const user = await User.create(data)
      return {
        msg: 'Usuario criado com Sucesso',
        user
      }
    }
  }
}
