import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { getFirebaseApp } from '../../infrastructure/firebase';

@Injectable()
export class AuthService {
  constructor() {}

  async getUserByEmail(email: string): Promise<any> {
    const app = getFirebaseApp();

    try {
      const user = await app.auth().getUserByEmail(email);
      return {
        id: user.uid,
      };
    } catch {}

    return null;
  }

  async createUser(email: string, password: string): Promise<any> {
    const app = getFirebaseApp();
    const user = await app.auth().createUser({
      uid: uuid(),
      email,
      password,
    });

    const jwtToken = await app.auth().createCustomToken(user.uid);
    return {
      id: user.uid,
      email: user.email,
      jwtToken,
    };
  }
}
