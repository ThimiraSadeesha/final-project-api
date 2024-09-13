import { Routes } from '@nestjs/core'
import { UserModule } from './src/modules/user/user.module'
import { VehicleModule } from './src/modules/vehicle/vehicle.module'
import { FireModule } from './src/modules/fire/fire.module'
import { HospitalModule } from './src/modules/hospital/hospital.module'
import { PoliceModule } from './src/modules/police/police.module'
import { RoleModule } from './src/modules/role/role.module'
import { ResponseModule } from './src/modules/response/response.module'
import { EmergencyPersonModule } from './src/modules/emergency-person/emergency-person.module'
import { DeviceModule } from './src/modules/device/device.module'
import { NotificationModule } from './src/modules/notification/notification.module'
import { HealthModule } from './src/modules/health/health.module'
import { InsuranceModule } from './src/modules/insurance/insurance.module'
import { IncidentModule } from './src/modules/incident/incident.module'


export const routes: Routes = [
  {
    path: 'accident',
    module: IncidentModule

  },   {
    path: 'health',
    module: HealthModule

  }, {
    path: 'user',
    module: UserModule,
  }, {
    path: 'vehicle',
    module: VehicleModule,
  }
  , {
    path: 'fire',
    module: FireModule,
  }
  , {
    path: 'hospital',
    module: HospitalModule,
  }
  , {
    path: 'police',
    module: PoliceModule,
  }
  , {
    path: 'role',
    module: RoleModule,
  }
  , {
    path: 'response',
    module: ResponseModule,
  }, {
    path: 'emergency',
    module: EmergencyPersonModule,
  }, {
    path: 'device',
    module: DeviceModule,
  }, {
    path: 'notification',
    module: NotificationModule,
  },, {
    path: 'insurance',
    module: InsuranceModule,
  },

]
