import 'babel-polyfill'
import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

export default (server) => {

  server.use(express.static(path.join(__dirname, 'public')))

  server.use(cookieParser())

  server.use(bodyParser.urlencoded({ extended: true }))
  server.use(bodyParser.json())

  return server

}
