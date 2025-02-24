import { LoggerService } from '@nestjs/common'
import bunyan from 'bunyan'
import config from 'config'

import LoggerConfig from '~/domain/config/LoggerConfig'

const appName = config.get<string>('appName')
const { logLevel } = config.get<LoggerConfig>('logger')

export default class Logger extends bunyan implements LoggerService {
  public provide = Logger
  public useClass = Logger

  constructor (options?: Omit<bunyan.LoggerOptions, 'name' | 'level'>) {
    super({
      name: appName,
      level: logLevel,
      ...options
    })
  }

  public log = this.info
}
