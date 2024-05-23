import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { RoleService } from './role.service';
import { CreateRoleDTO, UpdateRoleDTO } from './role.entity'

@Controller()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async getAllRoles() {
    return await this.roleService.getAll();
  }

  @Post()
  async createRole(@Body() createRoleDTO: CreateRoleDTO) {
    return await this.roleService.create(createRoleDTO);
  }

  @Put('/:id')
  async updateRole(@Param('id') id: number, @Body() updateRoleDTO: UpdateRoleDTO) {
    return await this.roleService.update(id, updateRoleDTO);
  }

  @Get('/:id')
  async getRoleById(@Param('id') id: number) {
    return await this.roleService.getById(id);
  }

}
