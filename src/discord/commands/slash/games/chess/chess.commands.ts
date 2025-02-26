import { Inject, UseInterceptors } from '@nestjs/common'
import { Context, Options, SlashCommandContext, Subcommand } from 'necord'

import { SelectGuildMemberInterceptor } from '~/core/interceptors/necord/select-guild-member.interceptor'
import Logger from '~/core/providers/logger.provider'

import { GameCommandsGroup } from '../../game.commands'
import { GameOptions } from '../../game.options'

@GameCommandsGroup()
@UseInterceptors(SelectGuildMemberInterceptor)
export class ChessGameCommand {
  constructor (
    @Inject(Logger) private readonly logger: Logger
  ) {}

  @Subcommand({
    name: 'chess',
    description: 'Play Chess with Max or someone else!'
  })
  public async playChess (
    @Context() [interaction]: SlashCommandContext,
      @Options() { userId }: GameOptions
  ): Promise<any> {
    const selectedUser = await interaction.guild?.members.fetch(userId)

    this.logger.info(`User ${interaction.user.displayName} requested to play chess with ${String(selectedUser?.displayName)}`)

    return await interaction.reply(`This is still under construction, but I understood you wanted to play chess with ${selectedUser?.displayName ?? 'UNKNOWN'}`)
  }
}
