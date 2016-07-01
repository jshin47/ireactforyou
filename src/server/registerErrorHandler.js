import 'babel-polyfill'
import express from 'express'
import PrettyError from 'pretty-error'
import { port, auth, analytics } from '../config'

const setupPrettyError = () => {
  const pe = new PrettyError()
  pe.skipNodeFiles()
  pe.skipPackage('express')
  return pe
}

export default (server) => {

  server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    console.log(setupPrettyError().render(err)) // eslint-disable-line no-console
    const template = require('./views/error.jade')
    const statusCode = err.status || 500
    res.status(statusCode)
    res.send(template({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
    }))
  })


  return server

}

