import { Module } from '@nestjs/common';
import { ChartService } from './chart.service';
import { ChartController } from './chart.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { NotificationService } from '../notification/notification.service'
import { Incident } from '../../schemas/incident.schema'
import { User } from '../../schemas/user.schema'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import * as dotenv from 'dotenv'
import * as process from 'node:process'

dotenv.config()

@Module({
  imports: [PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'zyxwvutsrqponmlkjihgfedcbaABCDEFGHIJKLMNOPQRSTUVWXYZ9876',
      signOptions: {expiresIn: '1h'},
    }),TypeOrmModule.forFeature([DataSource,Incident,User])],
  controllers: [ChartController],
  providers: [ChartService,NotificationService,JwtService],
})
export class ChartModule {}
