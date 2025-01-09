import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { processData, processPaginationData } from '../../utils/enums/util.enums'
import { CreateFireDTO, UpdateFireDTO } from './fire.entity'

@Injectable()
export class FireService {

  constructor(
    @InjectRepository(DataSource)
    private dataSourceRepository: Repository<DataSource>,
  ) {
  }

  async find(code: string, name: string, itemPerPage: number, page: number) {
    const result = await this.dataSourceRepository.query('CALL fire_find(?,?,?,?)', [
      code, name, itemPerPage, page,
    ])
    return processPaginationData(result)
  }

  async getAll() {
    const result = await this.dataSourceRepository.query('CALL accident_detection_DB.fire_getAll()')
    return processData(result, 0)
  }

  async create(createFireDTO:CreateFireDTO) {
   let result= await this.dataSourceRepository.query('CALL accident_detection_DB.fire_save(?,?,?,?,?,?,?)', [
      createFireDTO.fireCode,
      createFireDTO.fireName,
      createFireDTO.province,
      createFireDTO.city,
      createFireDTO.district,
      createFireDTO.areaCovered,
      createFireDTO.contactNumber,
    ])
    return processData(result, 1)
  }

  async update(id:number,updateFireDTO: UpdateFireDTO) {
    let result= await this.dataSourceRepository.query('CALL accident_detection_DB.fire_update(?,?,?,?,?,?,?,?)', [
      id,
      updateFireDTO.fireCode,
      updateFireDTO.fireName,,
      updateFireDTO.province,
      updateFireDTO.city,
      updateFireDTO.district,
      updateFireDTO.areaCovered,
      updateFireDTO.contactNumber,
    ])
    return processData(result, 1)
  }

  async getById(id: number) {
    const result = await this.dataSourceRepository.query('CALL accident_detection_DB.fire_get(?)', [
      id,
    ])
    return processData(result, 1)
  }



}
