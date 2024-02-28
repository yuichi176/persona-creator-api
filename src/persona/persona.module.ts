import { Module } from '@nestjs/common'
import { PersonaService } from './persona.service'
import { PersonaController } from './persona.controller'

@Module({
  providers: [PersonaService],
  controllers: [PersonaController],
})
export class PersonaModule {}
