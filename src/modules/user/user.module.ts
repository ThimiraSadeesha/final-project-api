import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([DataSource])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
