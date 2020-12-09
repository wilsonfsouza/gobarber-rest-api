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
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0),
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
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ]),
    );
  });
});
