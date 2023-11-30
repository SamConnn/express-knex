import { type Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  await knex.schema.createTable('user', (table) => {
    table.increments('id').primary()
    table.string('username').nullable()
    table.string('email').nullable()
    table.string('password').nullable()
    table.string('role').nullable()
    table.timestamps(true)
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.dropTable('user')
}
