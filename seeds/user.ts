import { faker } from '@faker-js/faker'
import { type Knex } from 'knex'

export async function seed (knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('user').del()

  // add array of objects to insertMany using faker
  const users = [...Array(100)].map(() => ({
    username: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: faker.person.jobTitle()
  }))

  // Inserts seed entries with data schema above using faker
  await knex('user').insert(users)
}
