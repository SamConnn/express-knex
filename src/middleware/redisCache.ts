// /* eslint-disable @typescript-eslint/strict-boolean-expressions */
// import { type NextFunction, type Request, type Response } from 'express'
// import { createClient } from 'redis'

// const redis = createClient({
//   password: 'secret_redis'
// })
// void redis.connect()

// export const isConnectToRedis = async (): Promise<void> => {
//   const redis = createClient()

//   redis.on('error', (err) => {
//     console.error(err)
//   })

//   redis.on('connect', () => {
//     console.log('Redis is connected')
//   })
// }

// export const redisCache = async (key: string, req: Request, res: Response, next: NextFunction): Promise<void> => {
//   redis.get(key).then((data) => {
//     if (data !== null) {
//       res.status(200).json({
//         status: 'success',
//         data: JSON.parse(data)
//       })
//     } else {
//       next()
//     }
//   }).catch((err) => {
//     console.log(err)
//   })
// }
