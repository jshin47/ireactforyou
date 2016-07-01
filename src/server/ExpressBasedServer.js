import 'babel-polyfill'
import express from 'express'
import extend from 'extend'

import registerAuthMiddleware from './registerAuthMiddleware'
import registerGraphApiMiddleware from './registerGraphApiMiddleware'
import registerStaticMiddleware from './registerStaticMiddleware'
import registerRenderingMiddleware from './registerRenderingMiddleware'
import registerErrorHandler from './registerErrorHandler'
import startListening from './startListening'

type FactoryType = () => object

const serverFactory: FactoryType = () => express()

export default class ExpressBasedServer {

  server: object

  configured: boolean

  constructor(factory: FactoryType = serverFactory) {

    this.configured = false
    this.guaranteeFreshServer(factory)

  }

  guaranteeFreshServer (factory: FactoryType = serverFactory) {
    this.server = global.server = factory()
  }

  configure () {

    if (!this.configured) {

      try {
        const s = this.server

        registerStaticMiddleware(s)
        registerAuthMiddleware(s)
        registerGraphApiMiddleware(s)
        registerRenderingMiddleware(s)
        registerErrorHandler(s)
        this.configured = true
      } catch (e) {
        this.configured = false
        this.guaranteeFreshServer()
      }
    }

  }

  run (failIfNotConfigured: boolean = false) {

    if (!this.configured) {

      if (failIfNotConfigured)
        throw new EventException('noipe')
      else {
        this.configure()
        this.run(true)
      }

    } else {
      startListening(server, 3000)
    }

  }

}
