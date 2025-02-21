import { Module } from '@nestjs/common'
import config from 'config'
import { IntentsBitField } from 'discord.js'
import { NecordModule } from 'necord'
import MaxConfig from '../domain/config/MaxConfig'
import { DiscordService } from './discord.service'
import { CommandsModule } from './commands/commands.module'

const { debugGuildId, prefix, token } = config.get<MaxConfig>('max')

@Module({
  imports: [
    NecordModule.forRoot({
      token,
      prefix,
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.MessageContent
      ],
      development: [debugGuildId]
    }),
    CommandsModule
  ],
  providers: [DiscordService]
})
export class DiscordModule {}
