import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDTO, UpdateDeviceDTO } from './device.entity';

@Controller()
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get()
  async getAllDevices() {
    return await this.deviceService.getAll();
  }

  @Post()
  async createDevice(@Body() createDeviceDTO: CreateDeviceDTO) {
    return await this.deviceService.create(createDeviceDTO);
  }

  @Put('/:id')
  async updateDevice(@Param('id') id: number, @Body() updateDeviceDTO: UpdateDeviceDTO) {
    return await this.deviceService.update(id, updateDeviceDTO);
  }

  @Get('/:id')
  async getDeviceById(@Param('id') id: number) {
    return await this.deviceService.getById(id);
  }
}
