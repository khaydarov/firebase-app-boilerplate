import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import * as admin from 'firebase-admin';
import { getFirebaseApp } from '../../infrastructure/firebase';

@Injectable()
export class AuthService implements OnApplicationBootstrap {
  private firebaseApp: admin.app.App;

  onApplicationBootstrap() {
    this.firebaseApp = getFirebaseApp();
  }

  async getUserByEmail(email: string): Promise<any> {
    try {
      const user = await this.firebaseApp.auth().getUserByEmail(email);
      return {
        id: user.uid,
      };
    } catch {}

    return null;
  }

  async createUser(email: string, password: string): Promise<any> {
    const user = await this.firebaseApp.auth().createUser({
      uid: uuid(),
      email,
      password,
    });

    return {
      id: user.uid,
      email: user.email,
    };
  }
}
