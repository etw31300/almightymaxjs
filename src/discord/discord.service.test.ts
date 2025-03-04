import Logger from '~/core/providers/logger.provider'
import { createTestingModuleWithCommonProviders } from 'test/utils/createTestingModuleWithCommonProviders'
import { DiscordService } from './discord.service'
import { Client } from 'discord.js'

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
      it.todo('')
    })

    describe('onLavalinkNodeConnect', () => {
      it.todo('')
    })
  })

  describe('Lavalink Manager Player Events', () => {
    describe('onLavalinkManagerPlayerCreate', () => {
      it.todo('')
    })

    describe('onLavalinkManagerPlayerDestroy', () => {
      it.todo('')
    })
  })
})
