import { Inject, UseInterceptors } from '@nestjs/common'
import { GameCommandsGroup } from '../../game.commands'
import { SelectGuildMemberInterceptor } from '~/core/interceptors/necord/select-guild-member.interceptor'
import { Context, Options, SlashCommandContext, Subcommand } from 'necord'
import { GameOptions } from '~/discord/commands/slash/game.options'
import Logger from '~/core/providers/logger.provider'

@GameCommandsGroup()
@UseInterceptors(SelectGuildMemberInterceptor)
export class TicTacToeGameCommand {
  constructor (
    @Inject(Logger) private readonly logger: Logger
  ) {}

  @Subcommand({
    name: 'tic-tac-toe',
    description: 'Play tic-tac-toe with Max or someone else!'
  })
  public async playTicTacToe (
    @Context() [interaction]: SlashCommandContext,
      @Options() { userId }: GameOptions
  ): Promise<any> {
    const selectedUser = await interaction.guild?.members.fetch(userId)

    this.logger.info(`User ${interaction.user.displayName} requested to play tic-tac-toe with ${String(selectedUser?.displayName)}`)

    return await interaction.reply(`This is still under construction, but I understood you wanted to play tic-tac-toe with ${selectedUser?.displayName ?? 'UNKNOWN'}`)
  }
}
