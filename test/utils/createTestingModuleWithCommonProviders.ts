import { ModuleMetadata, ValueProvider } from '@nestjs/common'
import { Test, TestingModuleBuilder, TestingModuleOptions } from '@nestjs/testing'
import BunyanLogger from 'bunyan'
import Logger from '~/core/providers/logger.provider'

export const mockLogger = {
  debug: jest.fn(),
  error: jest.fn(),
  info: jest.fn(),
  log: jest.fn(),
  warn: jest.fn()
} as unknown as jest.Mocked<BunyanLogger>

const mockLoggerProvider: ValueProvider<jest.Mocked<BunyanLogger>> = {
  provide: Logger,
  useValue: mockLogger
}

export const createTestingModuleWithCommonProviders = (metadata?: ModuleMetadata, options?: TestingModuleOptions): TestingModuleBuilder =>
  Test.createTestingModule({
    ...metadata,
    providers: [
      ...metadata?.providers ?? [],
      mockLoggerProvider
    ]
  }, options)
