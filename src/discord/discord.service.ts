import { Inject, Injectable } from '@nestjs/common'
import Logger from '~/core/providers/logger.provider'
import { Context, ContextOf, On } from 'necord'

@Injectable()
export class DiscordService {
  constructor (
    @Inject(Logger) private readonly logger: Logger
  ) {}

  @On('ready')
  public onReady (@Context() [client]: ContextOf<'ready'>): void {
    this.logger.info(`Successfully connected to Discord client as ${client.user.username}`)
  }

  @On('warn')
  public onWarn (@Context() [message]: ContextOf<'warn'>): void {
    this.logger.warn(message)
  }

  @On('error')
  public onError (@Context() [error]: ContextOf<'error'>): void {
    this.logger.error(`Error occured with the connected Discord client: ${error.message}`, error)
  }
}
