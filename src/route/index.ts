import eventRouter from './event.route'
import ticketRouter from './ticket.route'
import userRouter from './user.route'

export const routes = [
  { path: '/api/users', router: userRouter },
  { path: '/api/events', router: eventRouter },
  { path: '/api/tickets', router: ticketRouter }
]
