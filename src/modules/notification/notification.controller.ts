import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { NotificationService } from './notification.service'
import { CreateNotificationDTO, UpdateNotificationDTO } from './notification.entity'

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {
  }

  @Get('latest/notification')
  async getAllEmergencyPersons() {
    return await this.notificationService.getRecentIncidents()
  }

}
