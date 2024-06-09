# PREMIER LEAGUE API

> nodejs, typescript (with mongodb)

## Getting Started

> [Technologies](#technologies-used) &middot; [Testing Tools](#testing-tools) &middot; [Installations](#installations)
> &middot; [API Endpoints](#api-endpoints) &middot; [Tests](#tests) &middot; [Acknowledgments](#acknowledgments)
> &middot; [Author](#author)

## Deployed App
Application is deployed on GCP. Use public
URL [https://e](https://e) with API endpoints.

## Technologies Used

- [Node.js](node) A run time environment based off Chrome's v8 Engines for writing Javascript server-side applications.
- [Express.js](https://expressjs.com) - Web application framework based on Node.js.
- [ESLint](https://eslint.org/) - A pluggable and configurable linter tool for identifying and reporting on patterns in
  JavaScript.
- [Airbnb](https://www.npmjs.com/package/eslint-config-airbnb) style guide was followed.
- [TypeScript](https://www.typescriptlang.org/)

## Testing Tools

- [Jest](https://jestjs.io/) Jest is a JavaScript testing framework maintained by Facebook, Inc. designed and built by
  Christoph Nakazawa with a focus on simplicity and support for large web applications.

## Installations

#### Getting started

- You need to have Node and NPM installed on your computer.
- Installing [Node](node) automatically comes with npm.

#### Clone

- Clone this project to your local machine `https://github.com/oluwabukolatina/premier-league-api.git`
- Update example env file with your own details

#### Setup

- Installing the project dependencies
  > Run the command below
  ```shell
  $ npm install
  ```
- Start your node server
  > run the command below
   ```shell
   $ npm run dev or npm run debug
  ```
- Use `http://localhost:${PORT_NUMBER_SET_IN_ENV}` as base url for endpoints

## API Endpoints

| METHOD | DESCRIPTION                             | ENDPOINTS                 |
| ------ | --------------------------------------- | ------------------------- |
| GET    | home               | `/`           |

## Tests

- Run test for all endpoints
  > run the command below
  ```shell
  $ npm test
  ```

## Author

- [Tina](https://github.com/oluwabukolatina)
