import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { Incident } from '../../schemas/incident.schema'

@Module({
  imports: [TypeOrmModule.forFeature([Incident])],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
