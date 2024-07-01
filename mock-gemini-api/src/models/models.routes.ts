import { FastifyInstance } from 'fastify'
import { ModelsController } from './models.controller'

export class ModelsRoutes {
  initRoutes(server: FastifyInstance, opts: any, next: any): void {
    const modelsController = new ModelsController()

    server.post('/v1beta/models/gemini-1.5-flash:generateContent', modelsController.generateContent)

    next()
  }
}
