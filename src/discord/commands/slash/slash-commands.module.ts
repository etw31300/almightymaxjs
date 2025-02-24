import { Module, Provider } from '@nestjs/common'
import { GameCommandsModule } from './games/game-commands.module'

const slashCommandProviders: Provider[] = []

@Module({
  imports: [GameCommandsModule],
  providers: slashCommandProviders
})
export class SlashCommandsModule {}
