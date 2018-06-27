import * as dotenv from 'dotenv'
dotenv.config()
import * as next from 'next'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as jwt from 'express-jwt'
import { schema } from './graphql'

const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')

// Controllers (route handlers)
import * as authController from './controllers/auth'

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: true }))

  // API
  server.post('/api/login', authController.loginUser)
  // Protected GraphQL routes
  server.use(
    '/api/graphql',
    jwt({
      secret: process.env.AUTH_SECRET,
      getToken: function fromHeaderOrQuerystring(req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          return req.headers.authorization.split(' ')[1]
        } else if (req.query && req.query.token) {
          return req.query.token
        }
        return null
      },
    }),
    bodyParser.json(),
    graphqlExpress({ schema })
  )
  server.use(
    '/graphiql',
    jwt({
      secret: process.env.AUTH_SECRET,
      getToken: function fromHeaderOrQuerystring(req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          return req.headers.authorization.split(' ')[1]
        } else if (req.query && req.query.token) {
          return req.query.token
        }
        return null
      },
    }),
    graphiqlExpress({
      endpointURL: '/api/graphql',
    })
  )

  // Web routes
  server.get('/login', (req, res) => {
    return app.render(req, res, '/login', req.query)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
