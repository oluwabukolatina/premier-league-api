import request from 'supertest';
import setupTestDatabase from '../../database/setup-test-database';
import app from '../../app';
import { SIGN_UP_USER } from '../../component/user/auth/auth.url';

setupTestDatabase();
const MockData = {
  async loginActivatedUser(data: { email: string; password: string }) {
    const { body } = await request(app).post(SIGN_UP_USER).send(data);
    return body.data.token;
  },
};
export default MockData;
