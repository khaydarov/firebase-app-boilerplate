import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ResourceController } from './resource.controller';

@Module({
  imports: [ConfigModule],
  controllers: [ResourceController],
  providers: [],
})
export class ResourceModule {}
