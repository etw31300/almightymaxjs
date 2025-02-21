module.exports = {
  appName: 'Almighty Max',
  basePath: '/max',
  logger: {
    logLevel: 'debug'
  },
  max: {
    token: process.env.ALMIGHTY_MAX_TOKEN,
    debugGuildId: process.env.DEVELOPMENT_GUILD_ID
  }
}
