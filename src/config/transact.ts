import type { Knex } from 'knex'

interface TransactionOptions {
  isolationLevel?: Knex.IsolationLevels
  readOnly?: boolean
  deferrable?: Knex.deferrableType
}

export async function withTransaction<T> (
  knex: Knex,
  callback: (trx: Knex.Transaction) => Promise<T>,
  options?: TransactionOptions
): Promise<T> {
  let result: any
  let error: Error | undefined
  let trx: Knex.Transaction | undefined

  try {
    const trx = await knex.transaction(options)
    result = await callback(trx)
    await trx.commit()
  } catch (err) {
    if (err instanceof Error) error = err
    if (trx != null) {
      await trx.rollback()
    }
  }

  if (error != null) {
    throw error
  }

  return result
}
