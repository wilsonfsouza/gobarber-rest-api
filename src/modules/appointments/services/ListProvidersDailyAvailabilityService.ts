import { inject, injectable } from 'tsyringe';
import { getDaysInMonth, getDate, getHours } from 'date-fns';
// import User from '@modules/users/infra/typeorm/entities/User';
// import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IAppointmentsRepository from '@modules/appointments/repositories/iAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProvidersDailyAvailabilityService {
  constructor(
    @inject('AppointmentsRespository')
    private appointmentsRepository: IAppointmentsRepository,
  ) { }

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllByDayForOneProvider(
      {
        provider_id,
        day,
        month,
        year,
      },
    );

    const hourStart = 8;

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const availability = eachHourArray.map(hour => {
      const hasAppointmentAtHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );
      return {
        hour,
        available: !hasAppointmentAtHour,
      };
    });
    return availability;
  }
}

export default ListProvidersDailyAvailabilityService;
