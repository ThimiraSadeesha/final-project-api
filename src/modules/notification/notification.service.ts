import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { processData } from '../../utils/enums/util.enums'
import { CreateNotificationDTO, UpdateNotificationDTO } from './notification.entity'

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(DataSource)
    private dataSourceRepository: Repository<DataSource>,
  ) {
  }

  async getAll() {
    const result = await this.dataSourceRepository.query('CALL accident_detection_DB.notification_getAll()')
    return processData(result, 0)
  }

  async create(createNotificationDTO:CreateNotificationDTO) {
    let result= await this.dataSourceRepository.query('CALL accident_detection_DB.notification_save(?,?,?,?)', [
      createNotificationDTO.notificationType,
      createNotificationDTO.message,
      createNotificationDTO.location,
      createNotificationDTO.userId,
    ])
    return processData(result, 1)
  }

  async update(id:number, updateNotificationDTO:UpdateNotificationDTO) {
    let result= await this.dataSourceRepository.query('CALL accident_detection_DB.notification_update(?,?,?,?,?)', [
      id,
      updateNotificationDTO.notificationType,
      updateNotificationDTO.message,
      updateNotificationDTO.notificationType,
      updateNotificationDTO.userId
    ])
    return processData(result, 1)
  }

  async getById(id: number) {
    const result = await this.dataSourceRepository.query('CALL accident_detection_DB.notification_get(?)', [
      id,
    ])
    return processData(result, 1)
  }

}
