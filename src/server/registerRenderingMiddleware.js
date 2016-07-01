import 'babel-polyfill'
import ReactDOM from 'react-dom/server'
import Router from '../routes'
import assets from './assets'
import { port, auth, analytics } from '../config'

const successStatusCode = 200

const mkInitialData = () => ({
  title: '',
  description: '',
  css: '',
  body: '',
  entry: assets.main.js
})

export default (server) => {

  server.get('*', async (req, res, next) => {
    try {
      let statusCode = successStatusCode
      const template = require('./views/index.jade')
      const data = mkInitialData()

      if (process.env.NODE_ENV === 'production') {
        data.trackingId = analytics.google.trackingId
      }

      const css = []
      const context = {
        insertCss: styles => css.push(styles._getCss()),
        onSetTitle: value => (data.title = value),
        onSetMeta: (key, value) => (data[key] = value),
        onPageNotFound: () => (statusCode = 404),
      }

      await Router.dispatch({ path: req.path, query: req.query, context }, (state, component) => {
        data.body = ReactDOM.renderToString(component)
        data.css = css.join('')
      })

      res.status(statusCode)
      res.send(template(data))
    } catch (err) {
      next(err)
    }
  })

  return server

}

