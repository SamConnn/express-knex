import { type Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  await knex.schema.createTable('event_ticket', table => {
    table.increments('id').primary()
    table.integer('event_id').references('id').inTable('event').nullable()
    table.integer('ticket_id').references('id').inTable('ticket').nullable()
    table.string('created_at').nullable()
    table.string('updated_at').nullable()
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.dropTable('event_ticket')
}
