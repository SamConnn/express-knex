import { type Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  await knex.schema.createTable('book', (table) => {
    table.increments('id').primary()
    table.string('title').nullable()
    table.string('author').nullable()
    table.string('description').nullable()
    table.string('image').nullable()
    table.string('category').nullable()
    table.string('language').nullable()
    table.string('publisher').nullable()
    table.string('isbn').nullable()
    table.string('pages').nullable()
    table.string('year').nullable()
    table.string('price').nullable()
    table.string('stock').nullable()
    table.string('rating').nullable()
    table.string('createdAt').nullable()
    table.string('updatedAt').nullable()
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.dropTable('book')
}
