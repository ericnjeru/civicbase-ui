import * as functions from 'firebase-functions'
import express from 'express'
import cors from 'cors'
import { auth } from './utils/auth'
import { signup, reset, login, details, logout } from './api/user'
import {
  createSurvey,
  updateSurvey,
  surveys,
  publishSurvey,
  finishSurvey,
  cloneSurvey,
  deleteSurvey,
  getSurvey,
  getSurveyForAnalytics,
} from './api/survey'

import { createAnswer, createIndiaAnswer, uploadRecord } from './api/answer'

const app = express()

app.use(cors({ origin: true, credentials: true }))

app.post('/signup', signup)
app.post('/login', login)
app.post('/reset', reset)
app.get('/user', auth, details)
app.get('/logout', auth, logout)

app.get('/survey/:surveyId', getSurvey)
app.get('/surveys', auth, surveys)
app.post('/createSurvey', auth, createSurvey)
app.post('/updateSurvey/:surveyId', auth, updateSurvey)
app.get('/publish/:surveyId', auth, publishSurvey)
app.get('/finish/:surveyId', auth, finishSurvey)
app.get('/clone/:surveyId', auth, cloneSurvey)
app.delete('/delete/:surveyId', auth, deleteSurvey)
app.get('/analytics/:surveyId', auth, getSurveyForAnalytics)

app.post('/createAnswer', createAnswer)

app.post('/createIndiaAnswer', createIndiaAnswer)
app.post('/uploadRecord', uploadRecord)

exports.app = functions.https.onRequest(app)
