import { IsOptional } from 'class-validator'

class IncidentEntity {
  severity: string
  location: string
  incidentStatus: string
  deviceId: string

}

export class CreateIncidentDTO extends IncidentEntity {
}

export class UpdateIncidentDTO {

  @IsOptional()
  hospitalId: number
  @IsOptional()
  policeId: number
  @IsOptional()
  fireId: number
  @IsOptional()
  incidentStatus: string
}

