import { Body, Controller, Post, Res } from '@nestjs/common'
import { PersonaService } from './persona.service'
import { z } from 'zod'
import { Response } from 'express'

@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Post('generateContent')
  generateContent(@Body() body: GenerateContentRequestBody) {
    return this.personaService.generatePersona(
      body.age,
      body.gender,
      body.location,
      body.otherFeatures,
    )
  }

  @Post('streamGenerateContent')
  streamGenerateContent(@Body() body: GenerateContentRequestBody, @Res() res: Response) {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('Cache-Control', 'no-cache')
    res.status(200)
    return this.personaService.generateStreamPersona(
      body.age,
      body.gender,
      body.location,
      body.otherFeatures,
      res,
    )
  }
}

const generateContentRequestBodySchema = z.object({
  age: z.string(),
  gender: z.string(),
  location: z.string(),
  otherFeatures: z.string(),
})
type GenerateContentRequestBody = z.infer<typeof generateContentRequestBodySchema>
