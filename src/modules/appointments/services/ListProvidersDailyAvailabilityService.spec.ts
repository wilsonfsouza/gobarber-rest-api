import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProvidersDailyAvailabilityService from './ListProvidersDailyAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProvidersDailyAvailabilityService: ListProvidersDailyAvailabilityService;

describe('ListProvidersDailyAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProvidersDailyAvailabilityService = new ListProvidersDailyAvailabilityService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to show the daily availability of each provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'another-user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'another-user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const fakeCurrentDate = new Date(2020, 4, 20, 11);

      return fakeCurrentDate.getTime();
    });

    const availability = await listProvidersDailyAvailabilityService.execute({
      provider_id: 'user',
      day: 20,
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});
