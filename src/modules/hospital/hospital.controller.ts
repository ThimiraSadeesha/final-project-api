import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { HospitalService } from './hospital.service';
import { CreateHospitalDTO, UpdateHospitalDTO } from './hospital.entity'

@Controller()
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}
  @Get()
  async getAll() {
    return await this.hospitalService.getAll();
  }

  @Post()
  async create(@Body() createHospitalDTO: CreateHospitalDTO) {
    return await this.hospitalService.create(createHospitalDTO);
  }

  @Get('/:id')
  async getById(@Param('id') id: number) {
    return await this.hospitalService.getById(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateHospitalDTO: UpdateHospitalDTO) {
    console.log('dsfjsdfbjskdfbsdkf')
    return await this.hospitalService.update(id, updateHospitalDTO);
  }

}
