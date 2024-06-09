import request from 'supertest';
import setupTestDatabase from '../../database/setup-test-database';
import app from '../../app';
import * as url from '../../component/user/auth/auth.url';
import TestData from '../../lib/test.data';

setupTestDatabase();
const MockData = {
  async getSignedUpAdmin() {
    const data = TestData.registerUserPayload();
    const { password } = data;
    await request(app).post(url.SIGN_UP_ADMIN).send(data);
    return { password, email: data.email };
  },
  async getSignedUpuSER() {
    const data = TestData.registerUserPayload();
    const { password } = data;
    await request(app).post(url.SIGN_UP_USER).send(data);
    return { password, email: data.email };
  },
};
export default MockData;
