import type { Knex } from 'knex'

const table = 'test'

export async function testTransaction (trx: Knex.Transaction): Promise<any> {
  // Perform database operations using the transaction
  const result = await trx(table).select('*')
  return result
}
