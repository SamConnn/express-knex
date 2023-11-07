import type express from 'express'

interface Route {
  path: string
  router: express.Router
}

export const loopRoute = (routes: any, route: any): void => {
  routes.forEach(({ method, path, middleware, controller }) => {
    route[method](path, ...middleware, controller)
  })
}

const useRoutes = (app: express.Application, routes: Route[]): void => {
  routes.forEach((route) => {
    app.use(route.path, route.router)
  })
}

export default useRoutes
