import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { VehicleService } from './vehicle.service';
import { CreateVehicleDTO, UpdateVehicleDTO } from './vehicle.entity'

@Controller()
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get('/all')
  async  getAll(){
    return  await  this.vehicleService.getAll();
  }
  @Post()
  async create(@Body()createVehicleDTO: CreateVehicleDTO){
    return this.vehicleService.create(createVehicleDTO);
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.vehicleService.getById(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: number,@Body()updateVehicleDTO: UpdateVehicleDTO){
    return this.vehicleService.update(id,updateVehicleDTO);
  }
}
