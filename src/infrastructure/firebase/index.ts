import * as admin from 'firebase-admin';
import { getFirestore as db } from 'firebase-admin/firestore';
import { ConfigService } from '@nestjs/config';

let firebaseApp: admin.app.App;

export function initializeFirebaseApp(config: ConfigService) {
  if (firebaseApp) {
    console.log('Firebase app is already initialized');
    return;
  }

  const firebaseConfig = {
    type: config.get<string>('TYPE'),
    projectId: config.get<string>('PROJECT_ID'),
    privateKeyId: config.get<string>('PRIVATE_KEY_ID'),
    privateKey: config.get<string>('PRIVATE_KEY'),
    clientEmail: config.get<string>('CLIENT_EMAIL'),
    clientId: config.get<string>('CLIENT_ID'),
    authUri: config.get<string>('AUTH_URI'),
    tokenUri: config.get<string>('TOKEN_URI'),
    auth_provider_x509_cert_url: config.get<string>('AUTH_CERT_URL'),
    client_x509_cert_url: config.get<string>('CLIENT_CERT_URL'),
    universe_domain: config.get<string>('UNIVERSAL_DOMAIN'),
  } as admin.ServiceAccount;

  firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    projectId: firebaseConfig.projectId,
    databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
    storageBucket: `${firebaseConfig.projectId}.appspot.com`,
  });
}

export function getFirebaseApp(): admin.app.App {
  if (!firebaseApp) {
    throw new Error('Firebase app is not initialized');
  }

  return firebaseApp;
}

export function getFirestore(): admin.firestore.Firestore {
  if (!firebaseApp) {
    throw new Error('Firebase app is not initialized');
  }

  return db(firebaseApp.options.projectId);
}
