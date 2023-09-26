import { date, object, string } from 'yup'

export const userSchema = object({
  body: object({
    username: string().required(),
    email: string().required(),
    password: string().required(),
    role: string().required()
  })
})

export const eventSchema = object({
  body: object({
    name: string().required(),
    description: string().required(),
    location: string().required(),
    date: date().required(),
    time: date().required(),
    image: string().required()
  }),
  params: object({
    id: string().nullable()
  })
})

export const ticketSchema = object({
  body: object({
    name: string().required(),
    description: string().required(),
    price: string().required(),
    quantity: string().required(),
    event_id: string().required()
  }),
  params: object({
    id: string().nullable()
  })
})
