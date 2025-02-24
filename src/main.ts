import { NestFactory } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/platform-express'
import config from 'config'
import express from 'express'

import { AppModule } from './app.module'
import Logger from './core/providers/logger.provider'

const basePath = config.get<string>('basePath')
const port = config.get<number>('port')
const logger = new Logger()

async function bootstrap (): Promise<void> {
  const server = express()

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
    { logger }
  )
  app.setGlobalPrefix(basePath)

  await app.listen(port, () => {
    logger.info(`Successfully listening on port ${port}`)
  })
}

bootstrap().catch((err) => logger.error(err))
