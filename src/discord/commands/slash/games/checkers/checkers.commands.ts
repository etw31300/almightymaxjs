import { Inject, UseInterceptors } from '@nestjs/common'
import { Context, Options, SlashCommandContext, Subcommand } from 'necord'

import { SelectGuildMemberInterceptor } from '~/core/interceptors/necord/select-guild-member.interceptor'
import Logger from '~/core/providers/logger.provider'

import { GameCommandsGroup } from '../../game.commands'
import { GameOptions } from '../../game.options'

@GameCommandsGroup()
@UseInterceptors(SelectGuildMemberInterceptor)
export class CheckersGameCommand {
  constructor (
    @Inject(Logger) private readonly logger: Logger
  ) {}

  @Subcommand({
    name: 'checkers',
    description: 'Play Checkers with Max or someone else!'
  })
  public async playCheckers (
    @Context() [interaction]: SlashCommandContext,
      @Options() { userId }: GameOptions
  ): Promise<any> {
    const selectedUser = await interaction.guild?.members.fetch(userId)

    this.logger.info(`User ${interaction.user.displayName} requested to play checkers with ${String(selectedUser?.displayName)}`)

    return await interaction.reply(`This is still under construction, but I understood you wanted to play checkers with ${selectedUser?.displayName ?? 'UNKNOWN'}`)
  }
}
