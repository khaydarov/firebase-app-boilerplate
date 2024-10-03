import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-firebase-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { getFirebaseApp } from '../../infrastructure/firebase';

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

  async validate(token: string) {
    const firebaseUser: any = getFirebaseApp()
      .auth()
      .verifyIdToken(token, true)
      .catch((err: any) => {
        throw new UnauthorizedException(err.message);
      });
    if (!firebaseUser) {
      throw new UnauthorizedException();
    }
    return firebaseUser;
  }
}
