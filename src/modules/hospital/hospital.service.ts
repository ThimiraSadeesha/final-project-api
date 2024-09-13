import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { processData } from '../../utils/enums/util.enums'
import { CreateHospitalDTO, UpdateHospitalDTO } from './hospital.entity'

@Injectable()
export class HospitalService {
  constructor(
  @InjectRepository(DataSource)
  private dataSourceRepository: Repository<DataSource>,
) {
}

  async getAll() {
    const result = await this.dataSourceRepository.query('CALL accident_detection_DB.hospital_getAll()')
    return processData(result, 0)
  }

  async create(createHospitalDTO:CreateHospitalDTO) {
   let result= await this.dataSourceRepository.query('CALL accident_detection_DB.hospital_save(?,?,?,?,?,?,?)', [
      createHospitalDTO.code,
      createHospitalDTO.name,
     createHospitalDTO.contactNumber,
     createHospitalDTO.city,
     createHospitalDTO.district,
      createHospitalDTO.province,
      createHospitalDTO.areaCovered,

    ])

    return processData(result, 1)
  }


  async update(Id:number,updateHospitalDTO:UpdateHospitalDTO) {
    let result= await this.dataSourceRepository.query('CALL accident_detection_DB.hospital_update(?,?,?,?,?,?,?,?)', [
      Id,
      updateHospitalDTO.code,
      updateHospitalDTO.name,
      updateHospitalDTO.contactNumber,
      updateHospitalDTO.city,
      updateHospitalDTO.district,
      updateHospitalDTO.province,
      updateHospitalDTO.areaCovered,

    ])
    return processData(result, 0)
  }

  async getById(id: number) {
    const result = await this.dataSourceRepository.query('CALL accident_detection_DB.hospital_get(?)', [
      id,
    ])
    return processData(result, 1)
  }



}
