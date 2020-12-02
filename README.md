# Mapeando features do sistema
UX master class:
https://www.youtube.com/watch?v=mxIhSTP6ddE

## Macro
Por dentro sao muito bem definidas, mas conseguimos ver ela como uma tela da app

## Micro
order: RF -> RN -> RNF
**RF** = requisitos funcionais (funcionalidades)
**RNF** = requisitos nao funcionais (coisas que nao sao ligadas diretamente com a RN, sao requisitos tecnicos que fogem de como o app vai funcionar. Ex: O servico de email precisa ser feito usando lib nodemailer, qual db, sao coisas que escolhemos utilizar)
**RN** = regras de negocio - deve estar relacionada a um RF

## TODO

### Recuperacao de senha (user module)

**RF**

- The user must be able to recover its password using your email;
- The user must receive an email with intructions of how to recover its password;
- The user must be able to reset your password;

**RNF**

- Use Mailtrap to test sending emails in development;
- Use Amazon SES to sending emails in production;
- The email service must happen as a background job (microservice - fila);

**RN** -> pelo menos 1 teste por RN

- Identify user that is trying to reset password (to avoid having an user reseting the password of another user)
- Need to store reset password tokens
- The url sent by email to reset the password must expire within 2h;
- The user must confirm its new password after reseting the password; (validacao nao precisa ir dentro do service, vamos criar um middleware)


### Atualizacao do perfil (use module)
-> como service nao sabe que estamos usando o express (estavamos passando o user_id pelo header da request), precisamos mandar ele pelo user_id
**RF**

- The user must be able to update its profile (name, email, and password)

**RNF**

**RN**

- The user cannot change its email to another email already in use;
- To update the password, the user must inform its old password;
- To update the password, the user must confirm the new password; (teste na area de validacao)

### Painel do prestador (workers)

**RF**

- The worker must be able to list all your appoinments for a given day;
- (Real time) The worker must receive a notification for every time someone schedules a new appointment with them;
- (Real time) The worker must be able to see the unread notifications;

**RNF**

- Worker's scheduled appointments of the current day must be stored in cache;
- The notifications of a worker must be stored at MongoDB (since notifications are only text, they won't be saving the relationship of the appt-worker-user. MongoDB supports a large scale of data and good performance. It offers schema free - every notification can have a different content);
- The worker's notifications must be sent in real time using Socket.io;

**RN**

- A notification must have a read or unread status;

### Agendamento de servicos (users)

**RF**

- The user must be able to list all registered workers;
- The user must be able to list days in a given month with at least one open hour for a given worker;
- The user  must be able to list all hours available in a day for a given worker;
- The user must be able to schedule an appointment with a given worker;

**RNF**

- The list of workers must be stored in cache (every time an info change, we can clean the cache and reload the view);

**RN**

- Every appointment must be of 1h length (ideally we would want the workers to define that);
- Appoinments must be available between 8 am to 6 pm (first appt: 8 am, latest appt: 5 pm);
- The user cannot schedule a new appointment in an occupied slot;
- The user cannot schedule a new appointment in the past;
- The user cannot schedule a new appointment with itself;


### Steps
1. Crie a estrutura dos arquivos que vao precisar sem inserir as regras de negocio (service)
Ex: Recuperacao de senha
- Crio arquivo de Service e o teste com a estrutura mais basica
- Crio o provider (1. model, 2. fakes, 3. implementations)

- TDD = fail -> passed -> refactor
Fazer o teste mais simples possivel, algo muito isolado.

1. Macros: service -> entities, interface, fakeRepository (tests)

service and test ->

Apos testes estarem passando, vamos implementar as funcionalidades em development

1. Route and Controller
2. Token Repository (typeORM)
3. Create token migrations
4. Email Provider (development/implementation)
5. Register Providers in container (dependency injection)
6. Test Everything
