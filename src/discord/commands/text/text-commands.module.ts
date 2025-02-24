import { Module } from '@nestjs/common'
import { BarkCommands } from './bark.commands'

const textCommandProviders = [
  BarkCommands
]

@Module({
  providers: textCommandProviders
})
export class TextCommandsModule {}
