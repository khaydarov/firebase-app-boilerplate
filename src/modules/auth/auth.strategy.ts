import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-firebase-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { getFirebaseApp } from '../../infrastructure/firebase';
import { AuthenticatedUser } from './auth.types';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  'firebase-auth',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(token: string): Promise<AuthenticatedUser> {
    const app = getFirebaseApp();
    try {
      const decodedToken = await app.auth().verifyIdToken(token, true);
      return {
        id: decodedToken.uid,
        email: decodedToken.email,
        provider: decodedToken.firebase.sign_in_provider,
      } as AuthenticatedUser;
    } catch {}

    throw new UnauthorizedException();
  }
}
