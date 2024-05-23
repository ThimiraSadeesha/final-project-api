class EmergencyPersonEntity {
  personName:string;
  relation:string;
  address:string;
  nic:string;
  contactNumber:string;
  email:string;
  gender:string;
}
export  class CreateEmergencyPersonDTO extends EmergencyPersonEntity {}
export  class UpdateEmergencyPersonDTO extends EmergencyPersonEntity {}