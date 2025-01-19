import { Controller, Get } from '@nestjs/common'
import { ChartService } from './chart.service';

@Controller()
export class ChartController {
  constructor(private readonly chartService: ChartService) {}

  @Get('chart')
  async getCharts() {
    return await this.chartService.getAll();
  }
}
