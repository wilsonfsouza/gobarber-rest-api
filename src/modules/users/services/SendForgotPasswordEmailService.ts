// import AppError from '@shared/errors/AppError';
// import User from '@modules/users/infra/typeorm/entities/User';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
}
@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute(): Promise<void> { }
}

export default SendForgotPasswordEmailService;
