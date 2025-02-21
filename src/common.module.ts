import { Global, Module } from '@nestjs/common'
import Logger from './core/providers/logger.provider'

@Global()
@Module({
  providers: [
    Logger
  ],
  exports: [
    Logger
  ]
})
export default class CommonModule {}
