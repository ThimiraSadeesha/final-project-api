import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { User } from '../../schemas/user.schema'
import { LoginDTO } from '../chart/chart.entity'

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
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
    const payload = { username: user.userName }

    return {
      userName: user.userName,
      userId: user.id,
    }
  }

}
