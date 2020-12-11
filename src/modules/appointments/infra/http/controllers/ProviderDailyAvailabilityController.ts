import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProvidersDailyAvailabilityService from '@modules/appointments/services/ListProvidersDailyAvailabilityService';

export default class ProviderDailyAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.body;

    const listProvidersDailyAvailability = container.resolve(
      ListProvidersDailyAvailabilityService,
    );

    const availability = await listProvidersDailyAvailability.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(availability);
  }
}
