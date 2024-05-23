import { Body, Controller, Get, Param, Patch, Post} from '@nestjs/common'
import { UserService } from './user.service';
import { CreateUserDTO, UpdateUserDTO } from './user.entity'

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  async  getAll(){
    return  await  this.userService.getAll();
  }

  @Post()
  async create(@Body()createUserDTO:CreateUserDTO){

    return this.userService.create(createUserDTO);
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.userService.getUser(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: number,@Body()updateUserDTO:UpdateUserDTO){
    return this.userService.updateUser(id,updateUserDTO);
  }

}
