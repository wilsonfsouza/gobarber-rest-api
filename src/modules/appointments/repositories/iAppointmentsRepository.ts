import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentsDTO from '../dtos/ICreateAppointmentsDTO';
import IFindAllByMonthForOneProviderDTO from '../dtos/IFindAllByMonthForOneProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentsDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllByMonthForOneProvider(
    data: IFindAllByMonthForOneProviderDTO,
  ): Promise<Appointment[]>;
}
