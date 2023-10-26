import type express from 'express'

interface Route {
  path: string
  router: express.Router
}

const useRoutes = (app: express.Application, routes: Route[]): void => {
  routes.forEach((route) => {
    app.use(route.path, route.router)
  })
}

export default useRoutes
