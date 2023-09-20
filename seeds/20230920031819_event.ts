import { faker } from '@faker-js/faker'
import { type Knex } from 'knex'

export async function seed (knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('event').del()

  const event = [...Array(10)].map(() => ({
    id: faker.string.uuid(),
    name: faker.lorem.words(3),
    description: faker.lorem.words(10),
    location: faker.location.city(),
    date: faker.date.future(),
    time: faker.date.future(),
    image: faker.image.url(),
    created_at: faker.date.past(),
    updated_at: faker.date.past()
  }))
  // Inserts seed entries with data schema above using faker
  await knex('event').insert(event)
};
