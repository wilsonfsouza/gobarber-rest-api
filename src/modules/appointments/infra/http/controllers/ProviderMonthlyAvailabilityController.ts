import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProvidersMonthlyAvailabilityService from '@modules/appointments/services/ListProvidersMonthlyAvailabilityService';

export default class ProviderMonthlyAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.body;

    const listProvidersMonthlyAvailability = container.resolve(
      ListProvidersMonthlyAvailabilityService,
    );

    const availability = await listProvidersMonthlyAvailability.execute({
      provider_id,
      month,
      year,
    });

    return response.json(availability);
  }
}
