import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { FirebaseAuthStrategy } from './auth.strategy';

@Module({
  imports: [ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, FirebaseAuthStrategy],
})
export class AuthModule {}
