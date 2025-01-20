import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { processData } from '../../utils/enums/util.enums'
import { CreateNotificationDTO, UpdateNotificationDTO } from '../notification/notification.entity'
import { CreateIncidentDTO, UpdateIncidentDTO } from './incident.entity'

@Injectable()
export class IncidentService {constructor(
  @InjectRepository(DataSource)
  private dataSourceRepository: Repository<DataSource>,
) {
}


  async findIncidentReports(
    user_name: string,
    nic: string,
    contact_number: string,
    city: string,
    district: string,
    province: string,
    vehicle_number: string,
    device_id: string,
    severity: string,
    incident_status: string,
    startDate: number,
    endDate: number,
  ) {



    const result = await this.dataSourceRepository.query(
      'CALL incident_find(?,?,?,?,?,?,?,?,?,?,?,?)',
      [
        user_name,
        nic,
        contact_number,
        city,
        district,
        province,
        vehicle_number,
        device_id,
        severity,
        incident_status,
        startDate,
        endDate,
      ],
    );

    return processData(result,0);

  }



  async getAll() {
    const result = await this.dataSourceRepository.query('CALL accident_detection_DB.incident_getAll()')
    return processData(result, 0)
  }

  async create(createIncidentDTO:CreateIncidentDTO ) {
    let result= await this.dataSourceRepository.query('CALL accident_detection_DB.incident_save(?,?,?,?)', [
      createIncidentDTO.severity,
      createIncidentDTO.location,
      createIncidentDTO.incidentStatus,
      createIncidentDTO.deviceId,
    ])
    return processData(result, 1)
  }

  async update(id:number, updateIncidentDTO:UpdateIncidentDTO) {
    let result= await this.dataSourceRepository.query('CALL accident_detection_DB.incident_update(?,?,?,?,?)', [
      id,
      updateIncidentDTO.severity,
      updateIncidentDTO.location,
      updateIncidentDTO.incidentStatus,
      updateIncidentDTO.deviceId,
    ])
    return processData(result, 1)
  }

  async getById(id: number) {
    const result = await this.dataSourceRepository.query('CALL accident_detection_DB.incident_get(?)', [
      id,
    ])
    return processData(result, 1)
  }

}
