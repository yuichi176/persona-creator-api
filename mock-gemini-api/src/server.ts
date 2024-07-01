import Fastify from 'fastify'
import cors from '@fastify/cors'
import { Router } from './router'

const server = Fastify()

class MockGeminiApi {
  constructor() {
    this.init()
  }

  public init(): void {
    server.register(cors, {
      origin: true,
    })

    Router(server)

    server.listen({ port: 8081 }, (err, address) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      console.log(`Server listening on ${address}`)
    })
  }
}
new MockGeminiApi()
