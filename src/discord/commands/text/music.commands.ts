import { NecordLavalinkService, PlayerManager } from '@necord/lavalink'
import { Inject, Injectable } from '@nestjs/common'
import { Message } from 'discord.js'
import { Player } from 'lavalink-client'
import { Arguments, Context, TextCommand, TextCommandContext } from 'necord'
import Logger from '~/core/providers/logger.provider'

@Injectable()
export class MusicCommands {
  constructor (
    @Inject(Logger) private readonly logger: Logger,
    @Inject(PlayerManager) private readonly lavalinkPlayerManager: PlayerManager,
    @Inject(NecordLavalinkService) private readonly lavalinkService: NecordLavalinkService
  ) {}

  /**
   * Takes in the search query string or URL, and throws the first result into the listening queue. Immediately connects and plays if not connected or playing.
   */
  @TextCommand({
    name: 'play',
    description: 'Make max play a song for you!'
  })
  public async playSong (
    @Context() [message]: TextCommandContext,
      @Arguments() searchStrings: string[]
  ): Promise<any> {
    const searchQuery = searchStrings.join(' ')
    const { author: { displayName: authorName, id: authorId } } = message

    this.logger.info(`User ${authorName} requested Max to play song from search query: '${searchQuery}' for guild ${String(message.guildId)}`)

    if (!this.isGuildMessage(message)) {
      return await message.reply('This command can only be invoked from a guild! BORK BORK!')
    }

    const player = this.getPlayer(message)
    await this.connect(player)

    if (player.paused && searchQuery.length === 0) {
      await player.resume()
      return await message.react('thumbsup')
    }

    if (searchQuery.length === 0) {
      return await message.reply(`It appears you forgot to provide a search query for this command. Please provide something for me next time ${authorName}! BORK BORK!`)
    }

    const { tracks: [searchResult] } = await player.search({ query: searchQuery }, authorId)
    await player.queue.add(searchResult)
    if (!player.playing) await player.play()

    return await message.reply(`Now playing: "${searchResult.info.title}" by ${searchResult.info.author ?? 'Unknown'}.`)
  }

  /**
   * Stops audio playback and disconnects the player from the voice channel.
   */
  @TextCommand({
    name: 'stop',
    description: 'Stop audio playback and disconnect Max from the voice channel.'
  })
  public async stopPlayback (
    @Context() [message]: TextCommandContext
  ): Promise<void> {
    this.logger.info(`User ${message.author.displayName} requested Max to stop playing songs in guild ${String(message.guildId)}`)

    if (!this.isGuildMessage(message)) {
      await message.reply('This command can only be invoked from a guild! BORK BORK!')
      return
    }

    const player = await this.getPlayer(message)
    await this.disconnect(player)
    await player.destroy('User request', false)
  }

  /**
   * Checks if the provided player is connected or not.
   * @param player {@link Player} to check connection status on.
   * @returns boolean
   */
  private isPlayerConnected (player: Player): boolean {
    return player.connected === true
  }

  /**
   * Connects the player to the configured voice channel. Does nothing if the player is already connected.
   * @param player {@link Player} to connect.
   */
  private async connect (player: Player): Promise<void> {
    if (!this.isPlayerConnected(player)) {
      await player.connect()
    }
  }

  /**
   * Disconnects the player from the configured voice channel. Does nothing if the player is not connected.
   * @param player {@link Player} to disconnect.
   */
  private async disconnect (player: Player): Promise<void> {
    if (this.isPlayerConnected(player)) {
      await player.disconnect()
    }
  }

  private isGuildMessage (message: Message): message is Message<true> {
    return message.guildId !== null
  }

  private getPlayer (message: Message<true>): Player {
    return this.lavalinkPlayerManager.get(message.guildId) ??
      this.lavalinkPlayerManager.create({
        ...this.lavalinkService.extractInfoForPlayer(message),
        selfDeaf: true,
        selfMute: false,
        volume: 35
      })
  }
}
