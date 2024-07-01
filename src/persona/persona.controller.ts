import { Body, Controller, Post } from '@nestjs/common'
import { PersonaService } from './persona.service'
import { z } from 'zod'

@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Post('generateContent')
  generateContent(@Body() body: GenerateContentRequestBody) {
    return this.personaService.generatePersona(body.age, body.gender, body.otherFeatures)
  }
}

const generateContentRequestBodySchema = z.object({
  age: z.string(),
  gender: z.string(),
  otherFeatures: z.string(),
})
type GenerateContentRequestBody = z.infer<typeof generateContentRequestBodySchema>
