class NotificationEntity {
  notificationType:string;
  message:string;
  location:string;
  userId:number
}
export class CreateNotificationDTO extends NotificationEntity{

}
export class UpdateNotificationDTO extends NotificationEntity{}