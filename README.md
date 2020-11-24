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

**RN**

- The url sent by email to reset the password must expire within 2h;
- The user must confirm its new password after reseting the password;


### Atualizacao do perfil (use module)

**RF**

- The user must be able to update its profile (name, email, and password)

**RNF**

**RN**

- The user cannot change its email to another email already in use;
- To update the password, the user must inform its old password;
- To update the password, the user must confirm the new password;

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
