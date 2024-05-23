import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { IncidentHistoryService } from './incident-history.service';
import { CreateIncidentHistoryDTO, UpdateIncidentHistoryDTO } from './incident-history.entity'

@Controller()
export class IncidentHistoryController {
  constructor(private readonly incidentHistoryService: IncidentHistoryService) {}

  @Get()
  async getAllIncidentHistories() {
    return await this.incidentHistoryService.getAll();
  }

  @Get(':id')
  async getIncidentHistoryById(@Param('id') id: number) {
    return await this.incidentHistoryService.getById(id);
  }

  @Post()
  async createIncidentHistory(@Body() createIncidentHistoryDTO: CreateIncidentHistoryDTO) {
    return await this.incidentHistoryService.create(createIncidentHistoryDTO);
  }

  @Put(':id')
  async updateIncidentHistory(@Param('id') id: number, @Body() updateIncidentHistoryDTO: UpdateIncidentHistoryDTO) {
    return await this.incidentHistoryService.update(id, updateIncidentHistoryDTO);
  }
}
