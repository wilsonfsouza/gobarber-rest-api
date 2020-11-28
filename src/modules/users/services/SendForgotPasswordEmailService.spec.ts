import AppError from '@shared/errors/AppError';
import FakeEmailProvider from '@shared/container/providers/EmailProvider/fakes/FakeEmailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRespository from '../repositories/fakes/FakeUserTokensRespository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRespository;
let fakeEmailProvider: FakeEmailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmailService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRespository();
    fakeEmailProvider = new FakeEmailProvider();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeEmailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendEmail = jest.spyOn(fakeEmailProvider, 'sendEmail');
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com',
    });

    expect(sendEmail).toHaveBeenCalled();
  });
  it('should not be able to recover the password using invalid email', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should generate a token once the forgot password action is triggered', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
