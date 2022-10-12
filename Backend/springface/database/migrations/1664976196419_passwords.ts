import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Passwords extends BaseSchema {
  protected tableName = 'passwords'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('password').notNullable()
      table.string('url').notNullable()
      table.string('username').nullable()
      table.text('description', 'longtext').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
