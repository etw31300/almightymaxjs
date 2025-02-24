import { Inject, Injectable } from '@nestjs/common'
import { Context, TextCommand, TextCommandContext } from 'necord'

import Logger from '~/core/providers/logger.provider'
import { MessageResponse } from '~/domain/necord/message-response'

@Injectable()
export class BarkCommands {
  constructor (
    @Inject(Logger) private readonly logger: Logger
  ) {}

  @TextCommand({
    name: 'bark',
    description: 'Make Almighty Max Bark!'
  })
  public async bark (
    @Context() [message]: TextCommandContext
  ): Promise<MessageResponse> {
    this.logger.info(`Bark requested by ${message.author.username}`)
    return await message.reply('BORK BORK!')
  }
}
