// import AppError from '@shared/errors/AppError';
// import User from '@modules/users/infra/typeorm/entities/User';
import { inject, injectable } from 'tsyringe';
import IEmailProvider from '@shared/container/providers/EmailProvider/models/IEmailProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
}
@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('EmailProvider')
    private emailProvider: IEmailProvider,
  ) { }

  public async execute({ email }: IRequest): Promise<void> {
    this.emailProvider.sendEmail(
      email,
      'Your request to reset password was received.',
    );
  }
}

export default SendForgotPasswordEmailService;
