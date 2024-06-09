import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import setupTestDatabase from '../../database/setup-test-database';
import UserMock from '../mock/user.mock';
import app from '../../app';
import { LOGIN_USER_URL } from '../../component/user/module/auth/auth.url';
import FakeData from '../../lib/fake-data';
import { MESSAGE_INCORRECT_CREDENTIALS } from '../../component/user/module/auth/auth.message';
import { MESSAGE_UNVERIEFIED_ACCOUNT } from '../../component/user/user.message';

setupTestDatabase();
describe('auth test', () => {
  let IN_ACTIVE_USER = { email: '', password: '' };
  let ACTIVE_USER = { email: '', password: '' };
  beforeAll(async () => {
    const { user, password } = await UserMock.createUser();
    IN_ACTIVE_USER = { email: user.email, password };
    const { user: activeUser, password: activeUserPassword } =
      await UserMock.getActivatedUser();
    ACTIVE_USER = { email: activeUser.email, password: activeUserPassword };
  });

  it('does not let user that does not exist login', async () => {
    const { body, status } = await request(app)
      .post(`${LOGIN_USER_URL}`)
      .send({ email: FakeData.email(), password: FakeData.password() });
    expect(status).toEqual(StatusCodes.NOT_FOUND);
    expect(body).toHaveProperty('message');
    expect(body.status).toEqual(false);
  });
  it('does not let unverified user login', async () => {
    const { body, status } = await request(app)
      .post(`${LOGIN_USER_URL}`)
      .send({ email: IN_ACTIVE_USER.email, password: FakeData.password() });
    expect(status).toEqual(StatusCodes.BAD_REQUEST);
    expect(body).toHaveProperty('message');
    expect(body.status).toEqual(false);
  });
  it('does not let user with incorrect password to login', async () => {
    const { body, status } = await request(app)
      .post(`${LOGIN_USER_URL}`)
      .send({ email: ACTIVE_USER.email, password: FakeData.password() });
    expect(status).toEqual(StatusCodes.UNAUTHORIZED);
    expect(body).toHaveProperty('message', MESSAGE_INCORRECT_CREDENTIALS);
    expect(body.status).toEqual(false);
  });
  it('does not let user not active to login', async () => {
    const { body, status } = await request(app)
      .post(`${LOGIN_USER_URL}`)
      .send(IN_ACTIVE_USER);

    expect(status).toEqual(StatusCodes.BAD_REQUEST);
    expect(body).toHaveProperty('message', MESSAGE_UNVERIEFIED_ACCOUNT);
    expect(body.status).toEqual(false);
  });
  it('login user', async () => {
    const { body, status } = await request(app)
      .post(`${LOGIN_USER_URL}`)
      .send(ACTIVE_USER);
    expect(status).toEqual(StatusCodes.OK);
    expect(body).toHaveProperty('message');
    expect(body.status).toEqual(true);
    expect(body).toHaveProperty('data');
    expect(body.data).toHaveProperty('token');
  });
});
