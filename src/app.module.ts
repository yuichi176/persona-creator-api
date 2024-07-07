import { Module } from '@nestjs/common'
import { PersonaModule } from './persona/persona.module'
import { ConfigModule } from '@nestjs/config'
import { HealthModule } from './health/health.module'
import configuration from './config/configuration'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local'],
      load: [configuration],
    }),
    PersonaModule,
    HealthModule,
  ],
})
export class AppModule {}
