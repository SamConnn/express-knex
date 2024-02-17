import type express from 'express'
import { type Router } from 'express'
import { type RequestHandler } from 'express-serve-static-core'

interface Route {
  path: string
  router: express.Router
}

type Routes = [string, string, RequestHandler[], RequestHandler]

export const applyRoutes = (routes: Routes[], router: Router): void => {
  routes.forEach(([method, path, middleware, controller]) => {
    router[method](path, ...middleware, controller)
  })
}

const useRoutes = (app: express.Application, routes: Route[]): void => {
  routes.forEach((route) => {
    app.use(route.path, route.router)
  })
}

export default useRoutes
