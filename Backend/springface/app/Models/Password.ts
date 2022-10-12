import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Password extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public password: string

  @column()
  public description: string

  @column()
  public username: string

  @column()
  public url: string
  
}
