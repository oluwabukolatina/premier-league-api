# PREMIER LEAGUE API
Create an API that serves the latest scores of fixtures of matches in a “**Mock Premier League**”
## User Types
There should be:
- **Admin accounts** which are used to
  - signup/login
  - manage teams (add, remove, edit, view)
  - create fixtures (add, remove, edit, view)
  - Generate unique links for fixture
- **Users accounts** who can
  - signup/login
  - view teams
  - view completed fixtures
  - view pending fixtures
  - robustly search fixtures/teams
- Only the search API should be availble to the public.
## Authentication and Session Management
1. Use redis as your session store.
2. Authentication and Authorization for admin and user accounts should be done using `Bearer token` and `JWT`.

## Tools/Stack
- NodeJs (TypeScript & Express) or Golang
- MongoDB
- Redis
- Docker
- POSTMAN


## Getting Started
> [Technologies](#technologies-used) &middot; [Testing Tools](#testing-tools) &middot; [Installations](#installations)
> &middot; [API Endpoints](#api-endpoints) &middot; [Tests](#tests) &middot; [Acknowledgments](#acknowledgments)
> &middot; [Author](#author)

## Deployed App
Application is deployed on GCP. Use public
URL [https://premier-league-api-52kstxoqqa-uc.a.run.app/](https://premier-league-api-52kstxoqqa-uc.a.run.app/) with API endpoints.

## API Documentation
Application is available on postman on [https://documenter.getpostman.com/view/32462468/2sA3XLFjEx/](https://documenter.getpostman.com/view/32462468/2sA3XLFjEx).



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
