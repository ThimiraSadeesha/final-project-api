import { Module } from '@nestjs/common';
import { IncidentHistoryService } from './incident-history.service';
import { IncidentHistoryController } from './incident-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([DataSource])],
  controllers: [IncidentHistoryController],
  providers: [IncidentHistoryService],
})
export class IncidentHistoryModule {}
