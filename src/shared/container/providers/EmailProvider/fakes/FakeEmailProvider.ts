import ISendEmailDTO from '@shared/container/providers/EmailProvider/dtos/ISendEmailDTO';
import IEmailProvider from '../models/IEmailProvider';

export default class FakeEmailProvider implements IEmailProvider {
  private messages: ISendEmailDTO[] = [];

  public async sendEmail(message: ISendEmailDTO): Promise<void> {
    this.messages.push(message);
  }
}
