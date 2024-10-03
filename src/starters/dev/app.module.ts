import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../../modules/auth/auth.module';
import { resolveConfigPath } from '../../utils/path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: resolveConfigPath(process.env.NODE_ENV),
    }),
    AuthModule,
  ],
})
export class AppModule {}
