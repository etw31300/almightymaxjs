import { Inject, Injectable } from '@nestjs/common'
import Logger from '~/core/providers/logger.provider'
import { Context, ContextOf, On } from 'necord'
import { LavalinkManagerContextOf, NodeManagerContextOf, OnLavalinkManager, OnNodeManager } from '@necord/lavalink'

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

  @OnNodeManager('create')
  public onLavalinkNodeCreate (@Context() [node]: NodeManagerContextOf<'create'>): void {
    this.logger.info(`Lavalink node ${node.id} created`)
  }

  @OnNodeManager('connect')
  public onLavalinkNodeConnect (@Context() [node]: NodeManagerContextOf<'connect'>): void {
    this.logger.info(`Lavalink node ${node.id} connected successfully`)
  }

  @OnLavalinkManager('playerCreate')
  public onLavalinkManagerPlayerCreate (@Context() [player]: LavalinkManagerContextOf<'playerCreate'>): void {
    this.logger.info(`Lavalink player created for guild ${player.guildId} in void channel ${String(player.voiceChannelId)}`)
  }

  @OnLavalinkManager('playerDestroy')
  public onLavalinkManagerPlayerDestroy (@Context() [_player, reason]: LavalinkManagerContextOf<'playerDestroy'>): void {
    this.logger.info(`Lavalink player destroyed due to: '${reason ?? 'Uknown reasons'}'`)
  }
}
