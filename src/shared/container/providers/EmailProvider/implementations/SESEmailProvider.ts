import nodemailer, { Transporter } from 'nodemailer';
import aws from 'aws-sdk';
import { injectable, inject } from 'tsyringe';
import emailConfig from '@config/email';
import ISendEmailDTO from '@shared/container/providers/EmailProvider/dtos/ISendEmailDTO';
import IEmailTemplateProvider from '@shared/container/providers/EmailTemplateProvider/models/IEmailTemplateProvider';
import IEmailProvider from '../models/IEmailProvider';

@injectable()
export default class SESEmailProvider implements IEmailProvider {
  private client: Transporter;

  constructor(
    @inject('EmailTemplateProvider')
    private emailTemplateProvider: IEmailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_DEFAULT_REGION,
      }),
    });
  }

  public async sendEmail({
    to,
    subject,
    from,
    templateData,
  }: ISendEmailDTO): Promise<void> {
    const { name, email } = emailConfig.defaults.from;

    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.emailTemplateProvider.parse(templateData),
    });
  }
}
