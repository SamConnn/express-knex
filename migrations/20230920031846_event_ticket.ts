import { type Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  await knex.schema.createTable('event_ticket', table => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
    table.uuid('event_id').references('id').inTable('event').notNullable()
    table.uuid('ticket_id').references('id').inTable('ticket').notNullable()
    table.string('created_at').notNullable()
    table.string('updated_at').notNullable()
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.dropTable('event_ticket')
}
