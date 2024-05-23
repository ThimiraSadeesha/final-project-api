import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { FireService } from './fire.service';
import { CreateFireDTO, UpdateFireDTO } from './fire.entity'

@Controller()
export class FireController {
  constructor(private readonly fireService: FireService) {}

  @Get('/all')
  async getAll() {
    return await this.fireService.getAll();
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
