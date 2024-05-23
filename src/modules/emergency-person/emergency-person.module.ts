import { Module } from '@nestjs/common';
import { EmergencyPersonService } from './emergency-person.service';
import { EmergencyPersonController } from './emergency-person.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([DataSource])],
  controllers: [EmergencyPersonController],
  providers: [EmergencyPersonService],
})
export class EmergencyPersonModule {}
