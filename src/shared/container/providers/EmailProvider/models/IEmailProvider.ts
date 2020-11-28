import ISendEmailDTO from '@shared/container/providers/EmailProvider/dtos/ISendEmailDTO';

export default interface IEmailProvider {
  sendEmail(data: ISendEmailDTO): Promise<void>;
}
