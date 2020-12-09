import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentsDTO from '../dtos/ICreateAppointmentsDTO';
import IFindAllByMonthForOneProviderDTO from '../dtos/IFindAllByMonthForOneProviderDTO';
import IFindAllByDayForOneProviderDTO from '../dtos/IFindAllByDayForOneProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentsDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllByMonthForOneProvider(
    data: IFindAllByMonthForOneProviderDTO,
  ): Promise<Appointment[]>;
  findAllByDayForOneProvider(
    data: IFindAllByDayForOneProviderDTO,
  ): Promise<Appointment[]>;
}
