import { Global, Module } from '@nestjs/common'
import bunyanLoggerProvider from './core/providers/logger.provider'

@Global()
@Module({
  providers: [
    bunyanLoggerProvider
  ],
  exports: [
    bunyanLoggerProvider
  ]
})
export default class CommonModule {}
