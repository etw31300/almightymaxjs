import { Module } from '@nestjs/common'
import CommonModule from './common.module'
import { DiscordModule } from './discord/discord.module'

@Module({
  imports: [
    CommonModule,
    DiscordModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
