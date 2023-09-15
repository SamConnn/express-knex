import dotenv from 'dotenv'
import app from './src/app'
import { onDataBaseConnected } from './src/config/knex'
import { CustomError } from './src/lib/errors'

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...')
  console.log(err.name, err.message)
  process.exit(1)
})

dotenv.config({ path: './config.env' })

const databaseConnect = async (): Promise<void> => {
  await onDataBaseConnected()
    .then(() => {
      console.log('Database connected successfully')
    })
    .catch((err: any) => {
      console.log(err)
    })
}

void databaseConnect()
// void isConnectToRedis()

const port = (process.env.PORT ?? 8080)
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})

process.on('unhandledRejection', (err: Error) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...')
  console.log(err.name, err.message)
  return new CustomError(err.message, err.name, 500)
  // server.close(() => {
  //   process.exit(1)
  // })
})

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully')
  server.close(() => {
    console.log('💥 Process terminated!')
  })
})
