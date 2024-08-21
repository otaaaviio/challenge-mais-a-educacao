# Challenge Frontend

## Table of Contents

- [Overview](#overview)
- [Stack](#stack)
- [Key Features](#key-features)
  - [Authentication Page](#authentication)
  - [List of students](#list-of-students)
  - [Student Management](#student-management)
  - [Language Support](#language-support)
  - [Theme Switcher](#theme-switcher)
  - [Responsive Design](#responsive-design)
  - [Docker](#docker)
  - [Not Found Page](#not-found-page)
- [Getting Started](#getting-started)
- [Development](#development)
  - [Project Structure](#project-structure)
- [Conclusion](#conclusion)

## Overview

This project is a full stack web application developed to manage student enrollments in Web Programming classes at the Edtech institution. The application allows for the registration, consultation, editing, and deletion of students, following the defined technical specifications and acceptance criteria.

## Stack

- [Vue.js](https://vuejs.org/) - The Progressive JavaScript Framework
- [Vuetify](https://vuetifyjs.com/en/) - Material Design Component Framework
- [Vue i18n](https://kazupon.github.io/vue-i18n/) - Internationalization plugin for Vue.js
- [NGINX](https://nginx.org/en/) - Web server

## Key Features

### Authentication

The system has a login page, which is displayed when the user tries to access a page that requires authentication.

![image](https://github.com/user-attachments/assets/04a6d9f6-73d2-4340-989c-7aa689da8588)

### List of students

The system allows users to view, add, edit, and delete students. Students can be searched by RA, ordened by name, RA and CPF with pagination (10, 25, 50 and 100 per page).

![image](https://github.com/user-attachments/assets/8f3b734a-5bce-46fb-8203-c4e691f71ee1)

### Student Management

The system allows users create and edit students, with the following fields:

- Name
- Email
- CPF (non-editable) (unique)
- RA (non-editable) (unique)

![image](https://github.com/user-attachments/assets/5860eaae-76a7-49e2-9ce3-6b8873f7c288)

### Language Support

The system supports several languages, allowing users to choose the language of their preference. Among them, we have:
- Portuguese
- English

### Theme Switcher

The system allows users to choose between a light theme and a dark theme, allowing them to customize the appearance of the site according to their preferences.

### Responsive Design

The system is fully responsive, adapting to different screen sizes and devices.

### Docker

The system is containerized using Docker, making it easy to develop and scale. Using nginx as a web server, the system is served on port 8080.

### Not Found Page

The system has a 404 page, which is displayed when the user tries to access a non-existent page.

![image](https://github.com/user-attachments/assets/be300ed6-328c-4b81-a5b4-a02ed98b1046)

## Getting Started

### Prerequisites

This project requires the following dependencies:

- [Docker compose](https://docs.docker.com/compose/install/)

You can run locally without Docker, but you need to have the following dependencies:
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/get-npm)

### Installation

1. Clone the repo

```sh
git clone https://github.com/otaaaviio/library.git
```

2. Run the following command to build the project in first time

```sh
docker-compose up --build
```

3. Access the application in your browser at the following URL:

```sh
http://localhost:8080/
```

To run the project without Docker, you need to run the following commands:

```sh
npm install
```
And then:
```sh
npm run dev
```

## Development

### Project Structure

```
src/
├── api/
├── assets/
├── components/
├── interfaces/
├── layouts/
├── locales/
├── pages/
├── plugins/
├── router/
├── stores/
|── styles/
app.vue
main.ts
```

This structure suggests a web application project that uses a modular architecture, with a clear separation between different parts of the code, such as components, pages, styles, and business logic (API). If you need more details or help with something specific from this project, feel free to make a ask issue!

## Conclusion

This front-end project was developed to meet the needs of managing student enrollments in classes at the Edtech institution. Using Vue.js and Vuetify, the application offers an intuitive and responsive interface, allowing the creation, editing, consultation, and deletion of students. The implementation follows the defined technical specifications and acceptance criteria, ensuring a robust and efficient solution. The detailed documentation and modular code structure facilitate the maintenance and scalability of the project.

## Contact

If you have any questions, you can contact me by email or LinkedIn:

```
oglamberty@inf.ufsm.br

https://www.linkedin.com/in/otaaaviio/
```
