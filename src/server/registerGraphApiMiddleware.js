import 'babel-polyfill'
import expressGraphQL from 'express-graphql'
import schema from '../data/schema'
import { port, auth, analytics } from '../config'

export default (server) => {

  server.use('/graphql', expressGraphQL(req => ({
    schema,
    graphiql: true,
    rootValue: { request: req },
    pretty: process.env.NODE_ENV !== 'production',
  })))

  return server

}
