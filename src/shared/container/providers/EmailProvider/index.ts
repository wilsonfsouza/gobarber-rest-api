import { container } from 'tsyringe';
import emailConfig from '@config/email';

import IEmailProvider from './models/IEmailProvider';

import EtherealEmailProvider from './implementations/EtherealEmailProvider';
import SESEmailProvider from './implementations/SESEmailProvider';

const providers = {
  ethereal: container.resolve(EtherealEmailProvider),
  ses: container.resolve(SESEmailProvider),
};

container.registerInstance<IEmailProvider>(
  'EmailProvider',
  providers[emailConfig.driver],
);
