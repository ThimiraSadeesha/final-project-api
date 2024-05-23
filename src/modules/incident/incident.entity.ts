class IncidentEntity {
  severity:string;
  location:string;
  incidentStatus:string;
  deviceId:string;

}
export class CreateIncidentDTO extends IncidentEntity{}
export class UpdateIncidentDTO extends IncidentEntity{
}