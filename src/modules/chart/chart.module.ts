import { Module } from '@nestjs/common';
import { ChartService } from './chart.service';
import { ChartController } from './chart.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([DataSource])],
  controllers: [ChartController],
  providers: [ChartService],
})
export class ChartModule {}
