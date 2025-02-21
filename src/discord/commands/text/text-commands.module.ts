import { Module } from '@nestjs/common'
import { BarkCommands } from './bark.commands'

const textCommandProviders = [
  BarkCommands
]

@Module({
  providers: textCommandProviders,
  exports: textCommandProviders
})
export class TextCommandsModule {}
