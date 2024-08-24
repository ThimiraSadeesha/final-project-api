import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR, RouterModule } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './config/typeorm.config';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import { RequestInterceptor } from './interceptor/request.interceptor';
import { UserModule } from './modules/user/user.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { FireModule } from './modules/fire/fire.module';
import { PoliceModule } from './modules/police/police.module';
import { HospitalModule } from './modules/hospital/hospital.module';
import { ResponseModule } from './modules/response/response.module';
import { routes } from '../routes'
import { RoleModule } from './modules/role/role.module';
import { DeviceModule } from './modules/device/device.module';
import { IncidentModule } from './modules/incident/incident.module';
import { IncidentHistoryModule } from './modules/incident-history/incident-history.module';
import { EmergencyPersonModule } from './modules/emergency-person/emergency-person.module';
import { NotificationModule } from './modules/notification/notification.module';
import { DeviceConfigModule } from './modules/device-config/device-config.module';
import { MqttService } from './modules/mqtt/mqtt.service'
import { HealthModule } from './modules/health/health.module'
import { EventEmitterModule } from '@nestjs/event-emitter'


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,

    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    RouterModule.register(routes),
    HealthModule,
    EventEmitterModule.forRoot(),
    UserModule,
    VehicleModule,
    FireModule,
    PoliceModule,
    HospitalModule,
    ResponseModule,
    RoleModule,
    DeviceModule,
    IncidentModule,
    IncidentHistoryModule,
    EmergencyPersonModule,
    NotificationModule,
    DeviceConfigModule,

  ],
  controllers: [AppController],
  providers: [

    AppService,
    MqttService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestInterceptor,
    },
  ],
})
export class AppModule {}
