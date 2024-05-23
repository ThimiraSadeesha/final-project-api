import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { processData } from '../../utils/enums/util.enums'
import { CreateRoleDTO, UpdateRoleDTO } from './role.entity'

@Injectable()
export class RoleService {constructor(
  @InjectRepository(DataSource)
  private dataSourceRepository: Repository<DataSource>,
) {
}

  async getAll() {
    const result = await this.dataSourceRepository.query('CALL accident_detection_DB.role_getAll()')
    return processData(result, 0)
  }

  async create(createRoleDTO: CreateRoleDTO) {
    let result =  await this.dataSourceRepository.query('CALL accident_detection_DB.role_save(?,?,?)', [
      createRoleDTO.name,
      createRoleDTO.permission,
      createRoleDTO.roleStatus,
    ])
    return processData(result, 1)
  }

  async update(Id: number, updatePoliceDTO:UpdateRoleDTO) {
    let result = await this.dataSourceRepository.query('CALL accident_detection_DB.role_update(?,?,?,?)', [
      Id,
      updatePoliceDTO.name,
      updatePoliceDTO.permission,
      updatePoliceDTO.roleStatus,
    ])
    return processData(result, 1)
  }

  async getById(id: number) {
    const result = await this.dataSourceRepository.query('CALL accident_detection_DB.role_get(?)', [
      id,
    ])
    return processData(result, 1)
  }


}
