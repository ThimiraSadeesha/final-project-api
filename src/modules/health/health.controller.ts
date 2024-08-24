import { Controller, Get } from '@nestjs/common'
import * as os from 'os'


@Controller()
export class HealthController {
  @Get()
  info() {
    return {
      platform: os.platform(),
      type: os.type(),
      release: os.release(),
      architecture: os.arch(),
      cpus: os.cpus().length,
    }
  }
}
