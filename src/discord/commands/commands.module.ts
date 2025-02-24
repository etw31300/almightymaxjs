import { Module } from '@nestjs/common'
import { TextCommandsModule } from './text/text-commands.module'
import { SlashCommandsModule } from './slash/slash-commands.module'

@Module({
  imports: [
    TextCommandsModule,
    SlashCommandsModule
  ]
})
export class CommandsModule {}
