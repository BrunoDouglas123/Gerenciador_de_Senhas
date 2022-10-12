import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AuthController {
  public async auth({ auth, request, response }: HttpContextContract) {
    const username = request.input('username')
    const password = request.input('password')

    // Lookup user manually
    const user = await User.findByOrFail('username', username)

    // Verify password
    if (!(await Hash.verify(user.password, password))) {
      return response.unauthorized('Invalid credentials')
    }

    // Generate token
    const token = await auth.use('api').generate(user)
    return token
  }
}
