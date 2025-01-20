import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common'
import { IncidentService } from './incident.service';
import { CreateIncidentDTO, UpdateIncidentDTO } from './incident.entity'

@Controller()
export class IncidentController {
  constructor(private readonly incidentService: IncidentService) {}


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
    @Query('items_per_page') items_per_page: number,
    @Query('page_number') page_number: number,
  ) {
    return this.incidentService.findIncidentReports(
      user_name,
      nic,
      contact_number,
      city,
      district,
      province,
      vehicle_number,
      device_id,
      severity,
      incident_status,
      +items_per_page ,
      +page_number
    )

  }




  @Get('/all')
  async getAllIncidents() {
    return await this.incidentService.getAll();
  }

  @Get(':id')
  async getIncidentById(@Param('id') id: number) {
    return await this.incidentService.getById(id);
  }

  @Post()
  async createIncident(@Body() createIncidentDTO: CreateIncidentDTO) {
    return await this.incidentService.create(createIncidentDTO);
  }

  @Put(':id')
  async updateIncident(@Param('id') id: number, @Body() updateIncidentDTO: UpdateIncidentDTO) {
    return await this.incidentService.update(id, updateIncidentDTO);
  }
}
