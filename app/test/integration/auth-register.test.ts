import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import setupTestDatabase from '../../database/setup-test-database';
import UserMock from '../mock/user.mock';
import app from '../../app';
import { SIGN_UP } from '../../component/user/module/auth/auth.url';
import TestData from '../../lib/test.data';
import FakeData from '../../lib/fake-data';
import { MESSAGE_ACCOUNT_ALREADY_BELONGS_TO_USER } from '../../component/user/user.message';

setupTestDatabase();
describe('auth test', () => {
  let IN_ACTIVE_USER = { email: '', password: '' };
  beforeAll(async () => {
    const { user, password } = await UserMock.createUser();
    IN_ACTIVE_USER = { email: user.email, password };
  });
  it('registers user', async () => {
    const { body, status } = await request(app)
      .post(`${SIGN_UP}`)
      .send(TestData.registerUserPayload());

    expect(status).toEqual(StatusCodes.CREATED);
    expect(body).toHaveProperty('message');
    expect(body.status).toEqual(true);
  });
  it('does not let spam email register', async () => {
    const { body, status } = await request(app)
      .post(`${SIGN_UP}`)
      .send({
        firstName: FakeData.firstName(),
        lastName: FakeData.lastName(),
        email: `${FakeData.firstName()}@dpptd.com`,
        password: FakeData.password(),
      });
    expect(status).toEqual(StatusCodes.BAD_REQUEST);
    expect(body).toHaveProperty('message');
    expect(body.status).toEqual(false);
  });
  it('does not let user that exists to register', async () => {
    const { body, status } = await request(app).post(`${SIGN_UP}`).send({
      firstName: FakeData.firstName(),
      lastName: FakeData.lastName(),
      email: IN_ACTIVE_USER.email,
      password: FakeData.password(),
    });

    expect(status).toEqual(StatusCodes.BAD_REQUEST);
    expect(body).toHaveProperty('message');
    expect(body.message).toBe(MESSAGE_ACCOUNT_ALREADY_BELONGS_TO_USER);
    expect(body.status).toBe(false);
  });
});
