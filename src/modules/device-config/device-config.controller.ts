import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { DeviceConfigService } from './device-config.service';
import { CreateDeviceConfigDTO, UpdateDeviceConfigDTO } from './device-config.entity'

@Controller()
export class DeviceConfigController {
  constructor(private readonly deviceConfigService: DeviceConfigService) {}

  @Get()
  async getAllDeviceConfigs() {
    return await this.deviceConfigService.getAll();
  }

  @Get(':id')
  async getDeviceConfigById(@Param('id') id: number) {
    return await this.deviceConfigService.getById(id);
  }

  @Post()
  async createDeviceConfig(@Body() createDeviceConfigDTO: CreateDeviceConfigDTO) {
    return await this.deviceConfigService.create(createDeviceConfigDTO);
  }

  @Put(':id')
  async updateDeviceConfig(@Param('id') id: number, @Body() updateDeviceConfigDTO: UpdateDeviceConfigDTO) {
    return await this.deviceConfigService.update(id, updateDeviceConfigDTO);
  }
}
