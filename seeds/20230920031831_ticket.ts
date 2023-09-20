import { faker } from '@faker-js/faker'
import { type Knex } from 'knex'

export async function seed (knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('ticket').del()

  const ticket = [...Array(10)].map(() => ({
    id: faker.string.uuid(),
    name: faker.lorem.words(3),
    description: faker.lorem.words(10),
    price: faker.commerce.price(),
    quantity: faker.number.float(),
    event_id: faker.string.uuid(),
    created_at: faker.date.past(),
    updated_at: faker.date.past()
  }))

  // Inserts seed entries with data schema above using faker
  await knex('ticket').insert(ticket)
};
