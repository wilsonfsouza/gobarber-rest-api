import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';
import Notication from '../infra/typeorm/schemas/Notification';

export default interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<Notication>;
}
