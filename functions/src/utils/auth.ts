import { Response, NextFunction } from 'express'
import { admin } from '../config/firebase'

export const auth = (req: any, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if (!authorization && !authorization?.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Unauthorized' })
  }

  const token = authorization.split('Bearer ')[1]

  return admin
    .auth()
    .verifySessionCookie(token, true /** checkRevoked */)
    .then((decodedIdToken) => {
      req.user = {
        uid: decodedIdToken.uid,
        email: decodedIdToken.email,
        token,
      }

      return next()
    })
    .catch((error) => res.status(403).json({ ...error }))
}
