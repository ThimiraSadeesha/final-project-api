import { Module } from '@nestjs/common';
import { DeviceConfigService } from './device-config.service';
import { DeviceConfigController } from './device-config.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([DataSource])],
  controllers: [DeviceConfigController],
  providers: [DeviceConfigService],
})
export class DeviceConfigModule {}
