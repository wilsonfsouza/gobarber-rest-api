import IParseEmailTemplateDTO from '../dtos/IParseEmailTemplateDTO';

export default interface IEmailTemplateProvider {
  parse(data: IParseEmailTemplateDTO): Promise<string>;
}
