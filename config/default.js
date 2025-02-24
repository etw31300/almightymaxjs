module.exports = {
  appName: 'Almighty Max',
  basePath: '/max',
  port: 8080,
  logger: {
    logLevel: 'debug'
  },
  max: {
    prefix: 'm!',
    token: process.env.ALMIGHTY_MAX_TOKEN,
    debugGuildId: process.env.DEVELOPMENT_GUILD_ID,
    maxUserId: process.env.ALMIGHTY_MAX_USER_ID
  }
}
