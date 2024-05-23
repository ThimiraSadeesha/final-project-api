import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { processData } from '../../utils/enums/util.enums'

import { CreateIncidentHistoryDTO, UpdateIncidentHistoryDTO } from './incident-history.entity'

@Injectable()
export class IncidentHistoryService {
  constructor(
  @InjectRepository(DataSource)
  private dataSourceRepository: Repository<DataSource>,
) {
}

  async getAll() {
    const result = await this.dataSourceRepository.query('CALL accident_detection_DB.incident_history_getAll()')
    return processData(result, 0)
  }

  async create(createIncidentHistoryDTO:CreateIncidentHistoryDTO) {
    return await this.dataSourceRepository.query('CALL accident_detection_DB.incident_history_save(?)', [
      createIncidentHistoryDTO.incidentId
    ])
  }

  async update(Id: number, updateIncidentHistoryDTO:UpdateIncidentHistoryDTO) {
    return await this.dataSourceRepository.query('CALL accident_detection_DB.incident_history_update(?,?)', [
      Id,
      updateIncidentHistoryDTO.incidentId
    ])
  }

  async getById(id: number) {
    const result = await this.dataSourceRepository.query('CALL accident_detection_DB.incident_history_get(?)', [
      id,
    ])
    return processData(result, 0)
  }


}
