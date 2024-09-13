import { Module } from '@nestjs/common';
import { InsuranceService } from './insurance.service';
import { InsuranceController } from './insurance.controller';

@Module({
  controllers: [InsuranceController],
  providers: [InsuranceService],
})
export class InsuranceModule {}
