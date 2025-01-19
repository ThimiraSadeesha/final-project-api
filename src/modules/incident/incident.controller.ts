import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { IncidentService } from './incident.service';
import { CreateIncidentDTO, UpdateIncidentDTO } from './incident.entity'

@Controller()
export class IncidentController {
  constructor(private readonly incidentService: IncidentService) {}

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
