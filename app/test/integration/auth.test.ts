import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import setupTestDatabase from '../../database/setup-test-database';
import MockData from '../mock/mock-data';
import app from '../../app';
import * as url from '../../component/user/auth/auth.url';
import TestData from '../../lib/test.data';
import FakeData from '../../lib/fake-data';

setupTestDatabase();
describe('auth test', () => {
  let SIGNED_UP_ADMIN_EMAIL = '';
  let SIGNED_UP_ADMIN_PASSWORD = '';
  let SIGNED_UP_USER_EMAIL = '';
  let SIGNED_UP_USER_PASSWORD = '';
  beforeAll(async () => {
    const { email, password } = await MockData.getSignedUpAdmin();
    SIGNED_UP_ADMIN_EMAIL = email;
    SIGNED_UP_ADMIN_PASSWORD = password;
    const { email: USER_EMAIL, password: USER_PASSWORD } =
      await MockData.getSignedUpuSER();
    SIGNED_UP_USER_EMAIL = USER_EMAIL;
    SIGNED_UP_USER_PASSWORD = USER_PASSWORD;
  });
  it('sign up admin', async () => {
    const { body, status } = await request(app)
      .post(`${url.SIGN_UP_ADMIN}`)
      .send(TestData.registerUserPayload());
    expect(status).toEqual(StatusCodes.CREATED);
    expect(body.status).toEqual(true);
  });

  it('sign in admin', async () => {
    const { body, status } = await request(app)
      .post(`${url.SIGN_IN_ADMIN}`)
      .send({
        email: SIGNED_UP_ADMIN_EMAIL,
        password: SIGNED_UP_ADMIN_PASSWORD,
      });
    expect(status).toEqual(StatusCodes.OK);
    expect(body).toHaveProperty('message');
    expect(body.status).toEqual(true);
    expect(body).toHaveProperty('data');
    expect(body.data).toHaveProperty('token');
  });
  it('does not sign in user that does not exist', async () => {
    const { body, status } = await request(app)
      .post(`${url.SIGN_IN_ADMIN}`)
      .send({
        email: FakeData.email(),
        password: SIGNED_UP_ADMIN_PASSWORD,
      });
    expect(status).toEqual(StatusCodes.NOT_FOUND);
    expect(body).toHaveProperty('message');
    expect(body.status).toEqual(false);
  });
  it('sign up user', async () => {
    const { body, status } = await request(app)
      .post(`${url.SIGN_UP_USER}`)
      .send(TestData.registerUserPayload());
    expect(status).toEqual(StatusCodes.CREATED);
    expect(body.status).toEqual(true);
  });
});
