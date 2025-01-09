import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common'
import { FireService } from './fire.service';
import { CreateFireDTO, UpdateFireDTO } from './fire.entity'

@Controller()
export class FireController {
  constructor(private readonly fireService: FireService) {}

  @Get('find')
  async findOrders(
    @Query('code') code: string,
    @Query('name') name: string,
    @Query('items_per_page') itemsPerPage: number,
    @Query('page_number') pageNumber: number
  ) {
    return await this.fireService.find(
      code,
      name,
      +itemsPerPage,
      +pageNumber
    );
  }

  @Post()
  async create(@Body() createFireDTO: CreateFireDTO) {
    return await this.fireService.create(createFireDTO);
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.fireService.getById(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateFireDTO: UpdateFireDTO) {
    return await this.fireService.update(id, updateFireDTO);
  }

}
