import { Controller, Get, Query } from '@nestjs/common'
import { ChartService } from './chart.service'

@Controller()
export class ChartController {
  constructor(private readonly chartService: ChartService) {
  }


  @Get('find')
  async getIncidentReports(
    @Query('user_name') user_name: string,
    @Query('nic') nic: string,
    @Query('contact_number') contact_number: string,
    @Query('city') city: string,
    @Query('district') district: string,
    @Query('province') province: string,
    @Query('vehicle_number') vehicle_number: string,
    @Query('device_id') device_id: string,
    @Query('severity') severity: string,
    @Query('incident_status') incident_status: string,
    @Query('startDate') items_per_page: string,
    @Query('endDate') page_number: string,
  ) {
    return this.chartService.findIncidentReports(
      user_name || '',
      nic || '',
      contact_number || '',
      city || '',
      district || '',
      province || '',
      vehicle_number || '',
      device_id || '',
      severity || '',
      incident_status || '',
      items_per_page || '',
      page_number || ''
    )

  }


  @Get('chart')
  async getCharts() {
    return await this.chartService.getAll()
  }
}
