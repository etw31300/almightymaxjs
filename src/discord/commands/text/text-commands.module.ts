import { Module } from '@nestjs/common'
import { BarkCommands } from './bark.commands'

@Module({
  providers: [
    BarkCommands
  ]
})
export class TextCommandsModule {}
