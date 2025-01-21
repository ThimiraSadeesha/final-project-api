import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { processData } from '../../utils/enums/util.enums'
import { User } from '../../schemas/user.schema'
import { LoginDTO } from './chart.entity'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class ChartService {
  constructor(
    @InjectRepository(DataSource)
    private dataSourceRepository: Repository<DataSource>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {
  }

  async getAll() {
    const result = await this.dataSourceRepository.query('CALL sp_get_chart_data()')
    return processData(result, 1)
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
    startDate: string,
    endDate: string,
  ) {
    const result = await this.dataSourceRepository.query(
      'CALL incident_report_find(?,?,?,?,?,?,?,?,?,?,?,?)',
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
    )
    return processData(result, 0)
  }


  async validateUser(username: string, password: string) {
    const user = await this.userRepository.findOne({ where: { userName: username } })
    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }
    return user
  }

  async login(loginDTO: LoginDTO) {
    const user = await this.validateUser(loginDTO.username, loginDTO.password)
    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }
    const payload = { username: user.userName,password:user.userPassword,id:user.id }

    return {
      userName: user.userName,
      userId: user.id,
    }
  }

}
