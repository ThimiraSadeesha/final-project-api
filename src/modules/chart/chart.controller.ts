import { Controller, Get, Query } from '@nestjs/common'
import { ChartService } from './chart.service'
import { NotificationService } from '../notification/notification.service'

@Controller()
export class ChartController {
  constructor(private readonly chartService: ChartService,
              private readonly notificationService: NotificationService
  ) {
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
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
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
      startDate || '',
      endDate || ''
    )

  }


  @Get('chart')
  async getCharts() {
    return await this.chartService.getAll()
  }


  @Get('latest')
  async noti() {
    return await this.notificationService.getRecentIncidents()
  }


}
