import { LoggerService } from '@nestjs/common'
import BunyanLogger from 'bunyan'

import Logger from './logger.provider'

describe('logger.provider', () => {
  describe('Logger', () => {
    const loggerInstance = new Logger()

    it('should be an instance of the bunyan logger when instantiated', () => {
      expect(loggerInstance).toBeInstanceOf(BunyanLogger)
    })

    it.each<keyof LoggerService | keyof BunyanLogger>([
      'info',
      'debug',
      'warn',
      'error'
    ])('should expose the \'%s\' function when instantiated', (logFunction) => {
      expect(typeof loggerInstance[logFunction]).toBe('function')
    })
  })
})
