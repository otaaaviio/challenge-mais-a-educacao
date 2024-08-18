# Challenge Backend Implementation

## Table of Contents

- [Introduction](#introduction)
- [Stack](#stack)
- [Installation](#installation)
- [Tests](#tests)
- [Implementation Instructions](#implementation-instructions)

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

## Installation

To execute this project, you have 2 options:

ps: docker is much easier :p

### Local

First, you need to have on your machine:

- npm
- postgresql running
- redis running
- Clone the repository
```
git clone https://github.com/otaaaviio/challenge-mais-a-educacao.git
```
- Enter on backend folder
```
cd challenge-mais-a-educacao/backend
```

After that, you can follow the steps:

3. Install the dependencies

```bash
npm install
```

4. Copy the .env.example file to .env

```bash
cp .env.example .env
```

ps: You need to change the .env to your local configuration

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

```
http://localhost:3000
```

### Docker

3. Execute the bin for setup:

```bash
./bin/setup.sh
```

4. Access in your browser the address:

```
http://0.0.0.0:80
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

1. CRUD of students
   - The application includes endpoints for creating, reading, updating, and deleting student records.
   - Validation of student data using Zod.
   - Error handling with custom exceptions and middleware
   - Logging of errors and requests using the NestJS Logger.

2. Database
   - The application uses the Prisma ORM to manage the database, I chose to use Prisma because it is a modern and
     efficient ORM that allows for easy management of the database schema and data and I have experience with it.
   - The application uses PostgreSQL as the database engine.
   - The application uses Redis to cache the student list to improve user experience.

3. Models
   - The application has a student model that represents the student entity in the database.
   - I added a `deletedAt` column to the student model to implement soft delete and persist the data in the database.
   - The student model has a unique constraint on the RA field to ensure that there are no duplicate records in the
     database.

4. Validation
   - The app uses Zod to validate the student data before saving it to the database.
   - The app validates the student data when creating and updating student records.
   - Returns a 400 Bad Request response with the validation errors when the student data is invalid.
   - Have custom CPF rules to validate the CPF field

5. Tests
   - The application has tests for the student module using Jest.
   - The tests cover the main features of the student module, such as creating, reading, updating, and deleting student
     records.
   - The tests cover the error handling of the student module.
   - The tests use factories to create test data for the tests (implemented in the prisma/factories folder).
   - You can run the factories with the command `npm run factory [factoryName] [quantity]` to create test data.

6. Project structure
   - The application follows the NestJS project structure, with modules, controllers, services, and schemas.
   - Have user-friendly installation scripts to facilitate the setup of the project.
   - Have factories to create test data for the tests.

7. Organization
   - The application follows the SOLID principles to ensure that the code is clean, maintainable, and scalable.
   - The project uses linting and formatting tools to ensure code quality and consistency.

## Implementation Instructions

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
