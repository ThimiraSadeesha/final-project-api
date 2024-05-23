import { Status } from '../../utils/enums/status.enum'

class User{

  userName:string
  fullName:string
  nic:string
  contactNumber:string

  email:string

  gender:string

  address:string

  city:string

  district:string

  province:string

  userPassword: string

  role:number

  vehicles:number

  emergencyPersons:number

  devices:number

  notifications:number

}
export class CreateUserDTO extends User{


}

export class UpdateUserDTO extends User{
  userId:number;
  userStatus:Status;
}


