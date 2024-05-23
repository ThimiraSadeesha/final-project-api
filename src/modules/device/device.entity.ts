class DeviceEntity{
  name:string;
  type:string;
  deviceStatus:string;
  vehicleId:number;
  userId:number
}
export class CreateDeviceDTO extends DeviceEntity{}
export class UpdateDeviceDTO extends DeviceEntity{
}