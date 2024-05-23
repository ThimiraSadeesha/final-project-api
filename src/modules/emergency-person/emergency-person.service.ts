import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { processData } from '../../utils/enums/util.enums'
import { CreateEmergencyPersonDTO, UpdateEmergencyPersonDTO } from './emergency-person.entity'

@Injectable()
export class EmergencyPersonService {
  constructor(
    @InjectRepository(DataSource)
    private dataSourceRepository: Repository<DataSource>,
  ) {
  }

  async getAll() {
    const result = await this.dataSourceRepository.query('CALL accident_detection_DB.emergency_person_getAll()')
    return processData(result, 0)
  }

  async create(createEmergencyPersonDTO:CreateEmergencyPersonDTO) {
    let result= await this.dataSourceRepository.query('CALL accident_detection_DB.emergency_person_save(?,?,?,?,?,?,?)', [
      createEmergencyPersonDTO.personName,
      createEmergencyPersonDTO.relation,
      createEmergencyPersonDTO.address,
      createEmergencyPersonDTO.nic,
      createEmergencyPersonDTO.contactNumber,
      createEmergencyPersonDTO.email,
      createEmergencyPersonDTO.gender,
    ])
    return processData(result, 1)
  }

  async update(id:number, updateEmergencyPersonDTO:UpdateEmergencyPersonDTO) {
    let result= await this.dataSourceRepository.query('CALL accident_detection_DB.emergency_person_update(?,?,?,?,?,?,?,?)', [
      id,
      updateEmergencyPersonDTO.personName,
      updateEmergencyPersonDTO.relation,
      updateEmergencyPersonDTO.address,
      updateEmergencyPersonDTO.nic,
      updateEmergencyPersonDTO.contactNumber,
      updateEmergencyPersonDTO.email,
      updateEmergencyPersonDTO.gender,
    ])
    return processData(result, 1)
  }

  async getById(id: number) {
    const result = await this.dataSourceRepository.query('CALL accident_detection_DB.emergency_person_get(?)', [
      id,
    ])
    return processData(result, 1)
  }



}
