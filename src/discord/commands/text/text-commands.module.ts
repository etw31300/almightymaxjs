import { Module } from '@nestjs/common'
import { BarkCommands } from './bark.commands'
import { MusicCommands } from './music.commands'

@Module({
  providers: [
    BarkCommands,
    MusicCommands
  ]
})
export class TextCommandsModule {}
