import * as functions from 'firebase-functions'
import * as express from 'express'
import * as cors from 'cors'
import { signup, reset, login, details, logout } from './api/user'
import { auth } from './utils/auth'

const app = express()

app.use(cors({ origin: true, credentials: true }))

app.post('/signup', signup)
app.post('/login', login)
app.post('/reset', reset)
app.get('/user', auth, details)
app.get('/logout', auth, logout)

exports.app = functions.https.onRequest(app)
