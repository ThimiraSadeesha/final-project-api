class DeviceConfigEntity{
  configType:string;
  deviceStatus:string;
  configBy:string;
  deviceId:string;

}
export class CreateDeviceConfigDTO extends DeviceConfigEntity{}
export class UpdateDeviceConfigDTO extends DeviceConfigEntity{
}