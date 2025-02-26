import { Module } from '@nestjs/common'
import { CheckersGameCommand } from './checkers/checkers.commands'
import { ChessGameCommand } from './chess/chess.commands'
import { TicTacToeGameCommand } from './tic-tac-toe/tic-tac-toe.commands'

@Module({
  providers: [
    CheckersGameCommand,
    ChessGameCommand,
    TicTacToeGameCommand
  ]
})
export class GameCommandsModule {}
