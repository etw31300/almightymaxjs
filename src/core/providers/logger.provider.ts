import { FactoryProvider, LoggerService } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import bunyan from 'bunyan'
import config from 'config'
import { Request } from 'express'
import LoggerConfig from 'src/domain/config/LoggerConfig'

const appName = config.get<string>('appName')
const { logLevel } = config.get<LoggerConfig>('logger')

export class BunyanLogger implements LoggerService {
  protected readonly logger: bunyan

  constructor (options?: Omit<bunyan.LoggerOptions, 'name'>) {
    this.logger = bunyan.createLogger({
      name: appName,
      level: logLevel,
      ...options
    })
  }

  info (message: any, ...optionalParams: any[]): void {
    this.logger.info(message, ...optionalParams)
  }

  log (message: any, ...optionalParams: any[]): void {
    this.logger.info(message, ...optionalParams)
  }

  error (message: any, ...optionalParams: any[]): void {
    this.logger.error(message, ...optionalParams)
  }

  warn (message: any, ...optionalParams: any[]): void {
    this.logger.warn(message, ...optionalParams)
  }

  debug (message: any, ...optionalParams: any[]): void {
    this.logger.debug(message, ...optionalParams)
  }
}

const loggerFactoryProvider: FactoryProvider<BunyanLogger> = {
  provide: BunyanLogger,
  inject: [REQUEST],
  useFactory: (req: Request) => {
    const logger = new BunyanLogger({
      ...req.headers
    })

    return logger
  }
}

export default loggerFactoryProvider
