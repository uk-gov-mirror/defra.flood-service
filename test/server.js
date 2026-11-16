'use strict'

describe('createServer', () => {
  afterEach(() => {
    delete process.env.PM2_HOME
    jest.resetModules()
  })

  test('registers the route-logger plugin when not running under PM2', async () => {
    delete process.env.PM2_HOME
    const server = await require('../server')()

    expect(server.registrations['route-logger']).toBeDefined()
  })

  test('skips the route-logger plugin when running under PM2', async () => {
    process.env.PM2_HOME = '/tmp/.pm2'
    const server = await require('../server')()

    expect(server.registrations['route-logger']).toBeUndefined()
  })
})
