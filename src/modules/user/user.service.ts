import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUserDTO, UpdateUserDTO } from './user.entity'
import { processData } from '../../utils/enums/util.enums'

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(DataSource)
    private dataSourceRepository: Repository<DataSource>
  ) { }

  async getAll(){
    const result = await this.dataSourceRepository.query('CALL accident_detection_DB.user_getAll()');
    return processData(result, 0);
  }

  async create(createUserDTO: CreateUserDTO){
    const result= await this.dataSourceRepository.query('CALL accident_detection_DB.user_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
      createUserDTO.userName,
      createUserDTO.fullName,
      createUserDTO.nic,
      createUserDTO.contactNumber,
      createUserDTO.email,
      createUserDTO.gender,
      createUserDTO.address,
      createUserDTO.city,
      createUserDTO.district,
      createUserDTO.province,
      createUserDTO.userPassword,
      createUserDTO.role,
      createUserDTO.vehicles,
      createUserDTO.emergencyPersons,
      createUserDTO.devices,
    ]);
    // let res= processData(result,1)
    // console.log(res)
    return processData(result,1);
  }

  async getUser(userId: number) {
    const result = await this.dataSourceRepository.query('CALL accident_detection_DB.user_get(?)', [userId]);
    let data = processData(result, 0);
    data.map(function(user) {

      if (user.role) {
        try {
          user.role = JSON.parse(user.role)
        } catch (error) {
          console.error(`Error parsing department JSON for user ${user.userName}:`, error)
        }
      }
      if (user.vehicle) {
        try {
          user.vehicle = JSON.parse(user.vehicle)
        } catch (error) {
          console.error(`Error parsing vehicles JSON for user ${user.userName}:`, error)
        }
      }
    });
    return data;
  }

  async  updateUser(userId:number,updateUserDTO:UpdateUserDTO){
    return await this.dataSourceRepository.query('CALL accident_detection_DB.user_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
      userId,
      updateUserDTO.userName,
      updateUserDTO.fullName,
      updateUserDTO.nic,
      updateUserDTO.contactNumber,
      updateUserDTO.email,
      updateUserDTO.gender,
      updateUserDTO.address,
      updateUserDTO.city,
      updateUserDTO.district,
      updateUserDTO.province,
      updateUserDTO.userPassword,
      updateUserDTO.userStatus,
      updateUserDTO.role,
      updateUserDTO.vehicles,
      updateUserDTO.emergencyPersons,
      updateUserDTO.devices,
      updateUserDTO.notifications
    ]);
  }
}
