import { Injectable } from '@nestjs/common';
import { processData } from '../../utils/enums/util.enums'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'

@Injectable()
export class InsuranceService {
  constructor(
    @InjectRepository(DataSource)
    private dataSourceRepository: Repository<DataSource>,
  ) {
  }

  async getAll() {
    const result = await this.dataSourceRepository.query('CALL insurance_getAll()')
    return processData(result, 0)


  } async getById(id: number)  {
    const result = await this.dataSourceRepository.query('CALL insurance_get(?)')
    return processData(result, 1)
  }
}
