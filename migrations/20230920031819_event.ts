import { type Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  await knex.schema.createTable('event', table => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('name').notNullable()
    table.string('description').notNullable()
    table.string('location').notNullable()
    table.string('date').notNullable()
    table.string('time').notNullable()
    table.string('image').notNullable()
    table.string('created_at').notNullable()
    table.string('updated_at').notNullable()
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.dropTable('event')
}
