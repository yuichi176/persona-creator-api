import { FastifyInstance } from 'fastify'
import { ModelsRoutes } from './models/models.routes'

export const Router = (server: FastifyInstance): void => {
  const modelsRoutes = new ModelsRoutes()

  server.register(modelsRoutes.initRoutes)
}
