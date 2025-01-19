import { Controller, Get } from '@nestjs/common'
import { InsuranceService } from './insurance.service';

@Controller()
export class InsuranceController {
  constructor(private readonly insuranceService: InsuranceService) {}

  @Get('/all')
  async getAll() {
    return await this.insuranceService.getAll();
  }
}
