import 'babel-polyfill'

export default (server, port, msg) => {

  server.listen(port, () => {
    /* eslint-disable no-console */
    console.log(msg || 'The server is listening.')
  })

  return server

}
