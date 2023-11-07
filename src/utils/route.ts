import type express from 'express'

interface Route {
  path: string
  router: express.Router
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const loopRoute = (routes: any, route: any) => {
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
