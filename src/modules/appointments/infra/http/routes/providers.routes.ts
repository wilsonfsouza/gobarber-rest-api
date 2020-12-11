import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderDailyAvailabilityController from '../controllers/ProviderDailyAvailabilityController';
import ProviderMonthlyAvailabilityController from '../controllers/ProviderMonthlyAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerDailyAvailabilityController = new ProviderDailyAvailabilityController();
const providerMonthlyAvailabilityController = new ProviderMonthlyAvailabilityController();
providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/monthly-availability',
  providerMonthlyAvailabilityController.index,
);
providersRouter.get(
  '/:provider_id/daily-availability',
  providerDailyAvailabilityController.index,
);

export default providersRouter;
