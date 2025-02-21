import { Module } from '@nestjs/common'
import config from 'config'
import { IntentsBitField } from 'discord.js'
import { NecordModule } from 'necord'
import MaxConfig from '../domain/config/MaxConfig'
import { DiscordService } from './discord.service'

const { token, debugGuildId } = config.get<MaxConfig>('max')

@Module({
  imports: [
    NecordModule.forRoot({
      token,
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.DirectMessages
      ],
      development: [debugGuildId]
    })
  ],
  providers: [DiscordService]
})
export class DiscordModule {}
