import { Module } from '@nestjs/common'
import { PersonaService } from './persona.service'
import { PersonaController } from './persona.controller'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule],
  providers: [PersonaService],
  controllers: [PersonaController],
})
export class PersonaModule {}
