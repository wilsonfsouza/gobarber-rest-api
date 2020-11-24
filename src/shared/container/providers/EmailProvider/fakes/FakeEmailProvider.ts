import IEmailProvider from '../models/IEmailProvider';

interface IMessage {
  to: string;
  body: string;
}
export default class FakeEmailProvider implements IEmailProvider {
  private messages: IMessage[] = [];

  public async sendEmail(to: string, body: string): Promise<void> {
    this.messages.push({
      to,
      body,
    });
  }
}
