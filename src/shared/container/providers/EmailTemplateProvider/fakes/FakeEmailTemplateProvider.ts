import IParseEmailTemplateDTO from '../dtos/IParseEmailTemplateDTO';
import IEmailTemplateProvider from '../models/IEmailTemplateProvider';

class FakeEmailTemplateProvider implements IEmailTemplateProvider {
  public async parse({ template }: IParseEmailTemplateDTO): Promise<string> {
    return 'Email Content';
  }
}

export default FakeEmailTemplateProvider;
