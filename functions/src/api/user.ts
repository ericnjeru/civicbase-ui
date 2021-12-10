import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { Response } from 'express'
import { db, config, admin } from '../config/firebase'
import { SignupRequest, ResetPasswordRequest, LoginRequest } from '../../types/user.d'

initializeApp(config)

export const signup = async (req: SignupRequest, res: Response) => {
  const auth = getAuth()
  const { name, email, password } = req.body

  createUserWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      sendEmailVerification(user)

      return user.uid
    })
    .then((uid) => {
      const user = {
        name,
        email,
        uid,
        createdAt: new Date().toISOString(),
      }

      return db.doc(`/users/${uid}`).set(user)
    })
    .then(() => res.status(201).json({ code: 'auth/verify-email' }))
    .catch((error) => {
      if (error.code === 'auth/email-already-in-user') {
        return res.status(409).json({ ...error })
      } else {
        return res.status(400).json({ ...error })
      }
    })
}

export const login = async (req: LoginRequest, res: Response) => {
  const auth = getAuth()
  let uid: string
  const { email, password } = req.body

  signInWithEmailAndPassword(auth, email, password)
    .then(({ user }: any) => {
      uid = user.uid
      if (!user.emailVerified) {
        return res.status(403).json({ message: 'Please verify your email address' })
      }

      return user.getIdToken()
    })
    .then((idToken: string) => {
      const expiresIn = 60 * 60 * 24 * 5 * 1000

      return admin
        .auth()
        .createSessionCookie(idToken, { expiresIn })
        .then((token: string) => {
          db.doc(`/users/${uid}`)
            .get()
            .then((doc) => {
              return res.status(200).json({ user: doc.data(), token })
            })
        })
        .catch((error) => res.status(401).json({ message: 'Unauthorized request', ...error }))
    })
    .catch((error) => res.status(403).json({ message: 'Your email or password is incorrect', ...error }))
}

export const reset = async (req: ResetPasswordRequest, res: Response) => {
  const auth = getAuth()
  const { email } = req.body

  sendPasswordResetEmail(auth, email)
    .then(() => res.status(200).json({ message: 'Please check your email' }))
    .catch((error) => res.status(500).json({ ...error }))
}

export const details = async (req: any, res: Response) => {
  db.doc(`/users/${req.user.uid}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(200).json({ user: doc.data() })
      } else {
        return res.status(500).json({ message: 'Can not find user details' })
      }
    })
    .catch((error) => res.status(500).json({ ...error }))
}

export const logout = async (req: any, res: Response) => {
  admin
    .auth()
    .verifySessionCookie(req.user.token)
    .then((decodedIdToken) => admin.auth().revokeRefreshTokens(decodedIdToken.sub))
    .then(() => res.status(200).json({ message: 'User logged out' }))
    .catch((error) => res.status(500).json({ ...error }))
}
