import { Inject, Injectable } from '@nestjs/common'
import Logger from '../../../core/providers/logger.provider'
import { Context, TextCommand, TextCommandContext } from 'necord'
import { Message, OmitPartialGroupDMChannel } from 'discord.js'

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
  ): Promise<OmitPartialGroupDMChannel<Message<boolean>>> {
    this.logger.info(`Bark requested by ${message.author.username}`)
    return await message.reply('BORK BORK!')
  }
}
