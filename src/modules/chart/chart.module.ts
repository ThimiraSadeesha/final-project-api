import { Module } from '@nestjs/common';
import { ChartService } from './chart.service';
import { ChartController } from './chart.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { NotificationService } from '../notification/notification.service'
import { Incident } from '../../schemas/incident.schema'
import { User } from '../../schemas/user.schema'

@Module({
  imports: [TypeOrmModule.forFeature([DataSource,Incident,User])],
  controllers: [ChartController],
  providers: [ChartService,NotificationService],
})
export class ChartModule {}
