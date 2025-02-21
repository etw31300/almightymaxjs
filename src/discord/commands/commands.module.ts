import { Module } from '@nestjs/common'
import { TextCommandsModule } from './text/text-commands.module'

@Module({
  imports: [
    TextCommandsModule
  ]
})
export class CommandsModule {}
