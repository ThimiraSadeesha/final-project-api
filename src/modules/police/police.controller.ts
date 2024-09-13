import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { PoliceService } from './police.service';
import { CreatePoliceDTO, UpdatePoliceDTO } from './police.entity'

@Controller()
export class PoliceController {
  constructor(private readonly policeService: PoliceService) {}
  @Get()
  async getAll() {
    return await this.policeService.getAll();
  }

  @Post()
  async create(@Body() createPoliceDTO: CreatePoliceDTO) {
    return await this.policeService.create(createPoliceDTO);
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.policeService.getById(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updatePoliceDTO: UpdatePoliceDTO) {
    return await this.policeService.update(id, updatePoliceDTO);
  }
}
