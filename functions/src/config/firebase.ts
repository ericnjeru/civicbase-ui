import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import * as firebase from 'firebase/app'

// TODO: remove this
const config = {
  apiKey: functions.config().api_key,
  authDomain: 'civic-base.firebaseapp.com',
  projectId: 'civic-base',
  storageBucket: 'civic-base.appspot.com',
  messagingSenderId: '421351517108',
  appId: '1:421351517108:web:f731355f3bbaf00f49a0e1',
}

admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: functions.config().private_key.replace(/\\n/g, '\n'),
    projectId: functions.config().project_id,
    clientEmail: functions.config().client_email,
  }),
  databaseURL: 'https://civic-base.firebaseio.com',
})

const db = admin.firestore()

export { admin, db, firebase, config }
