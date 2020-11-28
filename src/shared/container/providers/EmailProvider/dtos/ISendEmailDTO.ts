import IParseEmailTemplateDTO from '@shared/container/providers/EmailTemplateProvider/dtos/IParseEmailTemplateDTO';

interface IEmailContact {
  name: string;
  email: string;
}
export default interface ISendEmailDTO {
  to: IEmailContact;
  from?: IEmailContact;
  subject: string;
  templateData: IParseEmailTemplateDTO;
}
