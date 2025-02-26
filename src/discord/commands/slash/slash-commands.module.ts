import { Module } from '@nestjs/common'
import { GameCommandsModule } from './games/game-commands.module'

@Module({
  imports: [GameCommandsModule],
  providers: []
})
export class SlashCommandsModule {}
