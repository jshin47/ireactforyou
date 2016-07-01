import 'babel-polyfill'
import expressJwt from 'express-jwt'
import jwt from 'jsonwebtoken'
import passport from '../core/passport'
import { port, auth, analytics } from '../config'

export default (server) => {

  server.use(expressJwt({
    secret: auth.jwt.secret,
    credentialsRequired: false,

    getToken: req => req.cookies.id_token,

  }))

  server.use(passport.initialize())

  server.get('/login/facebook',
    passport.authenticate('facebook', { scope: ['email', 'user_location'], session: false })
  )

  server.get('/login/facebook/return',
    passport.authenticate('facebook', { failureRedirect: '/login', session: false }),
    (req, res) => {
      const expiresIn = 60 * 60 * 24 * 180 // 180 days
      const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn })
      res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true })
      res.redirect('/')
    }
  )

  return server

}
