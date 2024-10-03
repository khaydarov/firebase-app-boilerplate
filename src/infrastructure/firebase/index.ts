import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

let firebaseApp: admin.app.App;

export function initializeFirebaseApp(config: ConfigService) {
  if (firebaseApp) {
    console.log('Firebase app is already initialized');
    return;
  }

  const firebaseConfig = {
    type: config.get<string>('TYPE'),
    project_id: config.get<string>('PROJECT_ID'),
    private_key_id: config.get<string>('PRIVATE_KEY_ID'),
    private_key: config.get<string>('PRIVATE_KEY'),
    client_email: config.get<string>('CLIENT_EMAIL'),
    client_id: config.get<string>('CLIENT_ID'),
    auth_uri: config.get<string>('AUTH_URI'),
    token_uri: config.get<string>('TOKEN_URI'),
    auth_provider_x509_cert_url: config.get<string>('AUTH_CERT_URL'),
    client_x509_cert_url: config.get<string>('CLIENT_CERT_URL'),
    universe_domain: config.get<string>('UNIVERSAL_DOMAIN'),
  } as admin.ServiceAccount;

  firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
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
