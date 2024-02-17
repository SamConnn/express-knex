import { exec } from 'child_process'
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

const MAX_RETRIES = 5
let retryCount = 0

const databaseConnect = async (): Promise<void> => {
  try {
    await onDataBaseConnected()
    console.log('Database connected successfully')
  } catch (err) {
    console.log(err)
    retryCount++
    if (retryCount < MAX_RETRIES) {
      console.log(`Retry attempt ${retryCount}...`)
      // Wait for 2 seconds before retrying
      setTimeout(() => {
        void databaseConnect()
      }, 2000)
    } else {
      console.log('Max retries reached. Restarting application...')
      // Restart the application
      exec('npm run start:dev', (error, stdout, stderr) => { // for production use 'npm run start'
        if (error != null) {
          console.error(`exec error: ${JSON.stringify(error)}`)
          return
        }
        console.log(`stdout: ${stdout}`)
        console.error(`stderr: ${stderr}`)
      })
    }
  }
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
