class Responses{
  responseStatus: string;
  responseTime: number;
  incidentId: number;
  policeDepartmentId: number;
  fireDepartmentId: number;
  hospitalDepartmentId: number;
}
export  class CreateResponseDTO extends Responses{}
export  class UpdateResponseDTO extends Responses{}
