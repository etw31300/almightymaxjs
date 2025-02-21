import { FactoryProvider, LoggerService, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import bunyan from 'bunyan'
import config from 'config'
import { Request } from 'express'

import LoggerConfig from '../../domain/config/LoggerConfig'

const appName = config.get<string>('appName')
const { logLevel } = config.get<LoggerConfig>('logger')

export default class Logger extends bunyan implements LoggerService {
  constructor (options?: Omit<bunyan.LoggerOptions, 'name' | 'level'>) {
    super({
      name: appName,
      level: logLevel,
      ...options
    })
  }

  public log = this.info
}

export const loggerProvider: FactoryProvider<Logger> = {
  provide: Logger,
  scope: Scope.REQUEST,
  inject: [REQUEST],
  useFactory: (req: Request) => {
    const logger = new Logger({
      ...req.headers
    })

    return logger
  }
}
