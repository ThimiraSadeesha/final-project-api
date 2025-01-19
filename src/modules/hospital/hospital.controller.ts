import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common'
import { HospitalService } from './hospital.service';
import { CreateHospitalDTO, UpdateHospitalDTO } from './hospital.entity'

@Controller()
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @Get('find')
  async findOrders(
    @Query('code') code: string,
    @Query('name') name: string,
    @Query('items_per_page') itemsPerPage: number,
    @Query('page_number') pageNumber: number
  ) {
    return await this.hospitalService.find(
      code,
      name,
      +itemsPerPage,
      +pageNumber
    );
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
