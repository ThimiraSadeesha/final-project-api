import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { NotificationService } from './notification.service';
import { CreateNotificationDTO, UpdateNotificationDTO } from './notification.entity'

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  async getAllEmergencyPersons() {
    return await this.notificationService.getAll();
  }

  @Post()
  async createEmergencyPerson(@Body() createNotificationDTO:CreateNotificationDTO) {
    return await this.notificationService.create(createNotificationDTO);
  }

  @Put('/:id')
  async updateEmergencyPerson(@Param('id') id: number, @Body() updateNotificationDTO:UpdateNotificationDTO) {
    return await this.notificationService.update(id, updateNotificationDTO);
  }

  @Get('/:id')
  async getEmergencyPersonById(@Param('id') id: number) {
    return await this.notificationService.getById(id);
  }
}
