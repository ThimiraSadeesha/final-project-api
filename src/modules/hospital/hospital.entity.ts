class Hospital{
  code: string;
  name: string;
  contactNumber: string;
  city: string;
  district: string;
  province: string;
  areaCovered: string;
}
export class CreateHospitalDTO extends Hospital{}
export class UpdateHospitalDTO extends Hospital{}