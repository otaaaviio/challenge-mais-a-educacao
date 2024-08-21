# Challenge Backend Implementation

## Table of Contents

- [Introduction](#introduction)
- [Stack](#stack)
- [Installation](#installation)
- [Tests](#tests)
- [CRUD Implementation instructions](#crud-implementation-instructions)

## Introduction

This project is a full stack web application developed to manage student enrollments in Web Programming classes at the
Edtech institution. The application allows for the registration, consultation, editing, and deletion of students,
following the defined technical specifications and acceptance criteria.

## Stack

- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [Jest](https://jestjs.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [Docker](https://www.docker.com/)
- [JWT](https://jwt.io/)

## Installation

To execute this project, you have 2 options (linux):

ps: docker is much easier :p

1. Clone the repository
```bash
git clone https://github.com/otaaaviio/challenge-mais-a-educacao.git
```
2. Enter on backend folder
```bash
cd challenge-mais-a-educacao/backend
```

### Local

First, you need to have on your machine:

- npm
- postgresql running
- redis running

After that, you can follow the steps:

3. Install the dependencies

```bash
npm install
```

4. Copy the `.env.example` file to `.env`

```bash
cp .env.example .env
```

ps: You need to change the `.env` to your local configuration

5. Run the migrations and fix the constraints

```bash
npx prisma migrate dev
npm run fix-constraints
```

6. Run the application

```bash
npm run start
```

7. Access in your browser the address:

Default port is 4000

```
http://localhost:[PORT]
```

### Docker

3. Execute the bin for setup:

```bash
./bin/setup.sh
```

4. Access in your browser the address:

```
http://0.0.0.0:[PORT]
```

For the next times, you can use this for start and stop the containers:

start:
```bash
docker compose up -d
```

stop:
```bash
docker compose down
```

## Tests

To execute tests, use the command:

Be careful: This will persist data tests in your database

Local:

```bash
npm run test
```

Docker:

```bash
docker exec -it challenge-node npm run test
```

## About implementation

Here, I will explain the main features implemented in this project:

### Required features:
1. **CRUD of students**
   - The application includes endpoints for creating, reading, updating, and deleting student records.
   - Validation of student data using Zod.
   - Logging of errors and requests using the NestJS Logger.

2. **Database**
   - The application uses the Prisma ORM to manage the database, I chose to use Prisma because it is a modern and
     efficient ORM that allows for easy management of the database schema and data and I have experience with it.

3. **Models**
   - The application has a student model that represents the student entity in the database.
   - The student model has a unique constraint on the RA field to ensure that there are no duplicate records in the
     database.

4. **Validation**
   - The app uses Zod to validate the student data before saving it to the database.
   - The app validates the student data when creating and updating student records.
   - Returns a 400 Bad Request response with the validation errors when the student data is invalid.

5. **Tests**
   - The application has tests for the student, auth and hello module (used to verify status server) using Jest.
   - The tests cover the main features of the student module, such as creating, reading, updating, and deleting student
     records and cover the error handling.

6. **Project structure**
   - The application follows the NestJS project structure, with modules, controllers, services, and schemas.
   - Have user-friendly installation scripts to facilitate the setup of the project.

7. **Organization**
   - The application follows the SOLID principles to ensure that the code is clean, maintainable, and scalable.
   - The project uses linting and formatting tools to ensure code quality and consistency.

### Additional features:
- `deletedAt` column to the student model to implement soft delete and persist the data in the database.
- Have factories to create test data for the tests.
- The application uses Redis to cache the student list to improve user experience.
- Have custom CPF rules to validate the CPF field
- The tests use factories to create test data for the tests (implemented in the prisma/factories folder).
- You can run the factories with the command `npm run factory [factoryName] [quantity]` to create test data.
- Error handling with custom exceptions and middleware.
- Unit tests for the services.
- Authentication with JWT.
- Custom LoggerMiddleware to log requests and time of execution.
- Custom AuthMiddleware to protect routes.
- Mocking in unit tests with jest.mock.

### Architecture
- **Modules**: The application is divided into modules, each responsible for a specific functionality. For example, the student module manages all operations related to students. 
- **Controllers**: Controllers handle HTTP requests and delegate business logic to services.
- **Services**: Services contain business logic and access the database and redis.
- **Middleware**: Custom middleware for error handling.
- **Schemas**: Schemas define the data validation rules using Zod.
- **Factories**: Factories to create test data for the tests.
- **Utils**: Helper functions and constants.
- **Bin**: Scripts to facilitate the setup of the project.

## CRUD Implementation Instructions

To next implementations, you can follow the examples below:

1. Create a table in prisma/schema.prisma
<br><br>

2. Create a module following the examples in src/modules/student
    - Pay attention to include all dependencies in '.module.ts' file
<br><br>
   
3. Validate the data request with zod following the examples in src/schemas
<br><br>

4. Finally, you can explore other features by exploring the repository

## Contact

If you have any questions, you can contact me by email or LinkedIn:

```
oglamberty@inf.ufsm.br

https://www.linkedin.com/in/otaaaviio/
```
