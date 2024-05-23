import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { ResponseService } from './response.service';
import { CreateResponseDTO, UpdateResponseDTO } from './response.entity'

@Controller()
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}


  @Get()
  async getAllResponses() {
    return await this.responseService.getAll();
  }

  @Post()
  async createResponse(@Body() createResponseDTO: CreateResponseDTO) {
    return await this.responseService.create(createResponseDTO);
  }

  @Put('/:id')
  async updateResponse(@Param('id') id: number, @Body() updateResponseDTO: UpdateResponseDTO) {
    return await this.responseService.update(id, updateResponseDTO);
  }

  @Get('/:id')
  async getResponseById(@Param('id') id: number) {
    return await this.responseService.getById(id);
  }
}
