import { Module, Provider } from '@nestjs/common'
import { CheckersGameCommand } from './checkers/checkers.command'
import { ChessGameCommand } from './chess/chess.command'

const gameProviders: Provider[] = [
  CheckersGameCommand,
  ChessGameCommand
]

@Module({
  providers: gameProviders
})
export class GameCommandsModule {}
