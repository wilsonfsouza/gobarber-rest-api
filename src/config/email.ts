interface IEmailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'wilson@wilsonfranca.dev',
      name: 'Wilson Franca',
    },
  },
} as IEmailConfig;
