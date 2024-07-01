import { Module } from '@nestjs/common'
import { PersonaModule } from './persona/persona.module'
import { ConfigModule } from '@nestjs/config'
import configuration from './config/configuration'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local'],
      load: [configuration],
    }),
    PersonaModule,
  ],
})
export class AppModule {}
