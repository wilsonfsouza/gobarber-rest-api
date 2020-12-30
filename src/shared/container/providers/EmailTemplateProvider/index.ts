import { container } from 'tsyringe';

import IEmailTemplateProvider from './models/IEmailTemplateProvider';
import HandlebarsEmailTemplateProvider from './implementations/HandlebarsEmailTemplateProvider';

const providers = {
  handlebars: HandlebarsEmailTemplateProvider,
};

container.registerSingleton<IEmailTemplateProvider>(
  'EmailTemplateProvider',
  providers.handlebars,
);
