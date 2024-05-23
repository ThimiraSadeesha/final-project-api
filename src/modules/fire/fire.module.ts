import { Module } from '@nestjs/common';
import { FireService } from './fire.service';
import { FireController } from './fire.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([DataSource])],
  controllers: [FireController],
  providers: [FireService],
})
export class FireModule {}
