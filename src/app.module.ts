import { Module } from '@nestjs/common'
import { PersonaModule } from './persona/persona.module'

@Module({
  imports: [PersonaModule],
})
export class AppModule {}
