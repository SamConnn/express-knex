import { type Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  await knex.schema.createTable('ticket', table => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('name').notNullable()
    table.string('description').notNullable()
    table.string('price').notNullable()
    table.string('quantity').notNullable()
    table.string('event_id').notNullable()
    table.string('created_at').notNullable()
    table.string('updated_at').notNullable()
    table.uuid('user_id').references('id').inTable('user')
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.dropTable('ticket')
}
