<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/wilsonfsouza/gobarber-rest-api">
  <a href="https://github.com/wilsonfsouza/happy-frontend-web/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/wilsonfsouza/gobarber-rest-api">
  </a>

   <img alt="License" src="https://img.shields.io/badge/license-MIT-%23F26C6C">


  <a href="https://www.linkedin.com/in/wilsonfsouza/">
    <img alt="Made by Wilson Franca" src="https://img.shields.io/badge/made%20by-Wilson%20Franca-%230AA186">
  </a>
</p>

<h1 align="center">
    GoBarber REST API
</h1>

<h4 align="center">
Table of Contents
</h4>

<p align="center">
 <a href="#-about-the-project">About</a> •
 <a href="#-how-to-run-the-project">How to run</a> •
 <a href="#-usage">Usage</a> •
 <a href="#-tests">Tests</a> •
 <a href="#-technologies">Technologies</a> •
 <a href="#-author">Author</a> •
 <a href="#user-content--license">License</a>
</p>


## 💻 About the project

This is the backend REST API made with Node.js, Express, and TypeScript for the GoBarber project. GoBarber is a web application for appointment scheduling designed for barbershops and hair salons.

By signing up, clients can schedule a new appointment with all available stylists working at the business. On the other hand, registered stylists have access to a web interface to manage their schedules with real-time updates (new or canceled appointments).

---

## 🚀 [](https://github.com/wilsonfsouza/gobarber-rest-api#how-to-run-the-project)How to run the project

### **Requirements**

Initial requirements:
[git](https://git-scm.com), [yarn](https://yarnpkg.com/), [docker](https://www.docker.com/), and a code editor of your choice.

### **Install project and dependencies**

```bash
# Clone this repository
$ git clone https://github.com/wilsonfsouza/gobarber-rest-api.git

# Access the folder in your terminal/cmd/cli
$ cd gobarber-rest-api

# Install all dependencies
$ yarn install

# Make a copy of '.env.example' to '.env'
# and set with YOUR environment variables.
# The AWS variables do not need to be filled for development environment
$ cp .env.example .env
```

### **Setup databases**
This project uses three databases:
- `Postgres`: to store most of the application data (general use)
- `MongoDB`: to store application's notifications
- `Redis`: to store the application's cache and rate limit middleware

### Postgres
```bash
# Create the instance of postgreSQL using docker
$ docker run --name postgres -e POSTGRES_USER=postgres \
              -e POSTGRES_DB=gostack_gobarber -e POSTGRES_PASSWORD=docker \
              -p 5432:5432 -d postgres

# Make a copy of 'ormconfig.example.json'
# to 'ormconfig.json'
# and set YOUR default database configuration.
$ cp ormconfig.example.json ormconfig.json

# Run typeorm migrations
$ yarn typeorm migration:run
```
> If you do not have Postgres installed on your machine, the port 5432 should be available. Otherwise, you can use port 5433 instead. Use -d flag to run your container in detached mode. This mode allows you to start and run your container in the background.

### MongoDB
```bash
# Create the instance of mongoDB using docker
$ docker run --name mongodb -p 27017:27017 -d -t mongo

# Access your ormconfig.json and add
# YOUR mongo configuration

# How do I know if MongoDB is running? Access localhost:27017 on your browser.
```

### Redis
```bash
# Create the instance of redis using docker
$ docker run --name gobarber-redis -p 6379:6379 -d -t redis:alpine

# Access your .env file and add your REDIS configuration
```

> For Windows users using Docker Toolbox, you might need to set the host for your databases on your .env and ormconfig.json files to 192.168.99.100 (docker machine IP) instead of localhost or 127.0.0.1.

### Understanding .env

|key|description|default
|---|---|---
|APP_API_URL|Used to mount avatars' urls.|`http://localhost:3333`
|APP_WEB_URL|Used to create the reset password link (front-end) sent in the recover password email.|`http://localhost:3000`
|APP_SECRET|An alphanumeric random string. Used to create signed tokens.| -
|MAIL_DRIVER|Indicate what email service use to send messages, the possible values are `ethereal` and `ses`, to use the [SES](https://aws.amazon.com/ses/) service remember to to configure the `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` and `AWS_DEFAULT_REGION` keys.|`ethereal`
|AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY|These keys are necessary to AWS allow the application to use the S3 and SES services throught API. See how to get yours keys here: [Set up AWS Credentials](https://docs.aws.amazon.com/toolkit-for-eclipse/v1/user-guide/setup-credentials.html).| -
|AWS_DEFAULT_REGION|You can see your default region in the navigation bar at the top right after login in the [AWS Management Console](https://sa-east-1.console.aws.amazon.com/console/home). Read [AWS service endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html) to know more about regions.| -
|AWS_S3_BUCKET_NAME|Amazon S3 stores data as objects within buckets. To create a bucket see [Creating a bucket](https://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html).|gobarber
|STORAGE_DRIVER| Indicate where the users's avatar will be stored, the possible values are `disk` and `s3`, to store into [S3](https://aws.amazon.com/s3/) remember to configure all the `AWS_*` keys. | disk
|REDIS_HOST|Redis host.|`localhost`
|REDIS_PORT|Redis port.|`6379`
|REDIS_PASS|Redis password.| -


### Start the application
```bash
# To start development server, run:
$ yarn dev:server
```

---

## ⭐ Usage
### **Bearer Token**
This app has open and private routes. Private routes expect a **Bearer token** in an `Authorization` header. The token is generated after a user sign in into the application throughout the `/sessions` route. This token will expire after 2 hours.

### **Routes**

### Users
|Route|HTTP Method|Params|Description|Auth method
|:---|:---:|:---:|:---:|:---:|:---:
|`/sessions`|POST|Body with user's email and password.|Authenticates user, return a Bearer Token and user's id and email.
|`/users`|POST|Body with user's name, email, and password.|Sign up for new users.
|`/profile`|GET| - |Shows user profile.|Bearer
|`/profile`|PUT|Body with user `name`, `email`, `old_password`, `password`, and `password_confirmation`.|Updates user information.|Bearer
|`/users/avatar`|PATCH|Multipart payload with a `avatar` field with a image.|Update user avatar.|Bearer
|`/password/forgot`|POST|Body with user's `email`.|Sends to user the reset password email.
|`/password/reset`|POST|Body with user's new `password` and `password_confirmation`.|Resets user's password.

### Appointments
|Route|HTTP Method|Params|Description|Auth method
|:---|:---:|:---:|:---:|:---:|:---:
|`/appointments`|POST|Body with appointment `provider_id` and `date`.|Schedules a new appointment.|Bearer
|`/appointments/me`|GET|`day`, `month` and `year` query parameters.|Returns user's scheduled appointments in a specific date.|Bearer
|`/providers`|GET|`page` query parameter.|Lists providers.|Bearer
|`/providers/:id/monthly-availability`|GET|`month` and `year` query parameters.|Lists provider's monthly availability|Bearer
|`/providers/:id/daily-availability`|GET|`day`, `month` and `year` query parameters.|Lists provider's daily availability for a given day.|Bearer

---

## ⚙️ Tests
```bash
# Run tests with docker containers running
$ yarn test

# Your can generate the test coverage with the following command
$ yarn test --coverage
```
---

## 🛠 Technologies

The following tools were used in this project:

### **REST  API**  ([Node.js](https://nodejs.org/en/)  +  [TypeScript](https://www.typescriptlang.org/))

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Docker](https://www.docker.com/)
- [Multer](https://github.com/expressjs/multer)
- [TypeORM](https://typeorm.io/#/)
- [JWT-token](https://jwt.io/)
- [Uuid v4](https://github.com/thenativeweb/uuidv4/)
- [PostgreSQL](https://www.postgresql.org/)
- [MongoDB](https://www.mongodb.com/)
- [Redis / ioredis](https://github.com/luin/ioredis)
- [Date-fns](https://date-fns.org/)
- [Nodemailer](https://nodemailer.com/about/)
- [Jest](https://jestjs.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)

> See the file  [package.json](https://github.com/wilsonfsouza/gobarber-rest-api/blob/master/package.json)

### [](https://github.com/wilsonfsouza/gobarber-rest-api#utilities)**Utilities**

-   Editor:  [Visual Studio Code](https://code.visualstudio.com/)
-   Markdown: [Markdown Emoji](https://gist.github.com/rxaviers/7360908)

---

## 💪 How to contribute to this project

1. **Fork** the project.
2. Start a new branch with your changes: `git checkout -b my-new-feature`
3. Save it and create a commit message describing what you have done: `git commit -m "feature: My new feature"`
4. Send your alterations: `git push origin my-feature`


---

## 👨‍💻 Author

<br/>
<h3 style="display: flex; align-items: center; justify-content: flex-start;">
 <img style="border-radius: 50%; margin-right: 20px; width: 80px;" src="https://avatars0.githubusercontent.com/u/21347383?s=460&u=fdb399c92e369762d45d6495cbd2e87eef9e4d65&v=4" width="100px;" alt=""/>
 <br />
 <sub>Wilson Franca</sub></h3>
 <br />

[![Linkedin Badge](https://img.shields.io/badge/-Wilson-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/wilsonfsouza/)](https://www.linkedin.com/in/wilsonfsouza/)
[![Gmail Badge](https://img.shields.io/badge/-wilson.franca.92@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:wilson.franca.92@gmail.com)](mailto:wilson.franca.92@gmail.com)

---

## 📝 License

This project is being developed under [MIT License](./LICENSE).

Made with ❤️ by Wilson Franca 👋

