import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
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
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerMonthlyAvailabilityController.index,
);

providersRouter.get(
  '/:provider_id/daily-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerDailyAvailabilityController.index,
);

export default providersRouter;
