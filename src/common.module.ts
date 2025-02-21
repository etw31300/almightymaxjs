import { Global, Module } from '@nestjs/common'
import { loggerProvider } from './core/providers/logger.provider'

@Global()
@Module({
  providers: [
    loggerProvider
  ],
  exports: [
    loggerProvider
  ]
})
export default class CommonModule {}
