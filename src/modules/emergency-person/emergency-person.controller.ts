import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { EmergencyPersonService } from './emergency-person.service';
import { CreateEmergencyPersonDTO, UpdateEmergencyPersonDTO } from './emergency-person.entity'

@Controller('person')
export class EmergencyPersonController {
  constructor(private readonly emergencyPersonService: EmergencyPersonService) {}

  @Get()
  async getAllEmergencyPersons() {
    return await this.emergencyPersonService.getAll();
  }

  @Post()
  async createEmergencyPerson(@Body() createEmergencyPersonDTO: CreateEmergencyPersonDTO) {
    return await this.emergencyPersonService.create(createEmergencyPersonDTO);
  }

  @Put(':id')
  async updateEmergencyPerson(@Param('id') id: number, @Body() updateEmergencyPersonDTO: UpdateEmergencyPersonDTO) {
    return await this.emergencyPersonService.update(id, updateEmergencyPersonDTO);
  }

  @Get(':id')
  async getEmergencyPersonById(@Param('id') id: number) {
    return await this.emergencyPersonService.getById(id);
  }
}
