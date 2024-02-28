import { Body, Controller, Post } from '@nestjs/common'
import { PersonaService } from './persona.service'

@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Post('answer')
  postAnswer(@Body() body: postAnswerRequest): Persona {
    console.log(body)
    return this.personaService.generatePersona()
  }
}

type postAnswerRequest = {
  gender: string
  age: number
  location: string
  income: string
  other: string
}

export type Persona = {
  name: string
  gender: string
  age: number
  occupation: string
  education: string
  income: string
  familyStructure: string
  hobbies: string
  personality: string
  workGoal: string
  currentSituation: string
}
