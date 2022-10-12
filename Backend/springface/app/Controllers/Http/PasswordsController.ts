import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Password from 'App/Models/Password'
import Encryption from '@ioc:Adonis/Core/Encryption'

// Encryption.encrypt('hello-world')
// Encryption.decrypt(encrypted)

export default class PasswordsController {
  public async index({}: HttpContextContract) {
    const passwords = await Password.all()
    return passwords
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['password', 'url', 'username', 'description'])
    const senha = Encryption.encrypt(data.password)

    data.password = senha
    const password = await Password.create(data)

    response.status(201)

    return {
      msg: "Criado com Sucesso!",
      data: password
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const password = await Password.findOrFail(params.id)
    const senha_descriptografada = Encryption.decrypt(password.password)

    if (password){
      response.status(200) 
    }else{
      response.status(404)
    }

    return {
      password,
      decrypt_pass: senha_descriptografada
    }
  }

  public async update({ request, params }: HttpContextContract) {
    const password = await Password.findOrFail(params.id)
    const data = request.only(['password', 'url', 'username', 'description'])
    const senha = Encryption.encrypt(data.password)

    data.password = senha

    password.merge(data)
    await password.save()

    return password
  }

  public async destroy({ params, response }: HttpContextContract) {
    const password = await Password.findOrFail(params.id)
    await password.delete()
    response.status(200)
  }
}
