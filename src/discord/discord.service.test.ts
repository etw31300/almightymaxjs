import { Client } from 'discord.js'
import { LavalinkNode, Player } from 'lavalink-client'
import { v4 as uuid } from 'uuid'

import Logger from '~/core/providers/logger.provider'
import { createTestingModuleWithCommonProviders } from 'test/utils/createTestingModuleWithCommonProviders'

import { DiscordService } from './discord.service'

describe('DiscordService', () => {
  let discordService: DiscordService
  let mockLogger: jest.Mocked<Logger>

  beforeAll(async () => {
    const module = await createTestingModuleWithCommonProviders({
      providers: [
        DiscordService
      ]
    }).compile()

    discordService = await module.resolve(DiscordService)
    mockLogger = await module.resolve(Logger)
  })

  afterEach(() => jest.resetAllMocks())

  describe('Necord Events', () => {
    describe('onReady', () => {
      it('should log a successful connection info message when emitted', () => {
        const expectedUsername = 'someUser'
        const mockClient = {
          user: {
            username: expectedUsername
          }
        } as unknown as Client<true>

        expect(discordService.onReady([mockClient])).toBeUndefined()
        expect(mockLogger.info).toHaveBeenCalledExactlyOnceWith(`Successfully connected to Discord client as ${expectedUsername}`)
      })
    })

    describe('onWarn', () => {
      it('should log the provided warning message when emitted', () => {
        const expectedMessage = 'some warning message'

        expect(discordService.onWarn([expectedMessage])).toBeUndefined()
        expect(mockLogger.warn).toHaveBeenCalledExactlyOnceWith(expectedMessage)
      })
    })

    describe('onError', () => {
      it('should log an error message when emitted', () => {
        const expectedError = new Error('oh no')

        expect(discordService.onError([expectedError])).toBeUndefined()
        expect(mockLogger.error).toHaveBeenCalledExactlyOnceWith(
          `Error occured with the connected Discord client: ${expectedError.message}`,
          expectedError
        )
      })
    })
  })

  describe('Lavalink Node Manager Events', () => {
    describe('onLavalinkNodeCreate', () => {
      it('should log out a node was created when emitted', () => {
        const expectedNode = {
          id: 'some-node-id'
        } as unknown as LavalinkNode

        expect(discordService.onLavalinkNodeCreate([expectedNode])).toBeUndefined()
        expect(mockLogger.info).toHaveBeenCalledExactlyOnceWith(`Lavalink node ${expectedNode.id} created`)
      })
    })

    describe('onLavalinkNodeConnect', () => {
      it('should log out a node was connected to successfully when emitted', () => {
        const expectedNode = {
          id: 'some-node-id'
        } as unknown as LavalinkNode

        expect(discordService.onLavalinkNodeConnect([expectedNode])).toBeUndefined()
        expect(mockLogger.info).toHaveBeenCalledExactlyOnceWith(`Lavalink node ${expectedNode.id} connected successfully`)
      })
    })
  })

  describe('Lavalink Manager Player Events', () => {
    describe('onLavalinkManagerPlayerCreate', () => {
      it('should log out the guild and voice channel the player was created for when emitted', () => {
        const expectedPlayer = {
          guildId: uuid(),
          voiceChannelId: uuid()
        } as unknown as Player

        expect(discordService.onLavalinkManagerPlayerCreate([expectedPlayer])).toBeUndefined()
        expect(mockLogger.info).toHaveBeenCalledExactlyOnceWith(`Lavalink player created for guild ${expectedPlayer.guildId} in void channel ${String(expectedPlayer.voiceChannelId)}`)
      })
    })

    describe('onLavalinkManagerPlayerDestroy', () => {
      it('should log out the provided reason for the player being destroyed when emitted', () => {
        const expectedReason = 'some reason'

        expect(discordService.onLavalinkManagerPlayerDestroy([{} as unknown as Player, expectedReason])).toBeUndefined()
        expect(mockLogger.info).toHaveBeenCalledExactlyOnceWith(`Lavalink player destroyed due to: '${expectedReason}'`)
      })

      it('should log out the default \'Unknown reasons\' as the destroyed reason when one isn\'t provided when emitted', () => {
        expect(discordService.onLavalinkManagerPlayerDestroy([{} as unknown as Player])).toBeUndefined()
        expect(mockLogger.info).toHaveBeenCalledExactlyOnceWith('Lavalink player destroyed due to: \'Unknown reasons\'')
      })
    })
  })
})
