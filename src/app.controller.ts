import { Controller, Get, Inject } from '@nestjs/common'
import { AppService } from './app.service'
import { BunyanLogger } from './core/providers/logger.provider'

@Controller()
export class AppController {
  constructor (
    @Inject(AppService) private readonly appService: AppService,
    @Inject(BunyanLogger) private readonly logger: BunyanLogger
  ) {}

  @Get()
  getHello (): string {
    this.logger.info('Hello World!')
    return this.appService.getHello()
  }
}
