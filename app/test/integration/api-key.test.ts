import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import setupTestDatabase from '../../database/setup-test-database';
import MockData from '../mock/mock-data';
import app from '../../app';
import { GET_API_KEY_URL } from '../../component/api-key/api-key.url';

setupTestDatabase();
describe('api key test', () => {
  let AUTHORIZATION_TOKEN = '';
  beforeAll(async () => {
    const token = await MockData.getAuthorizationToken();
    AUTHORIZATION_TOKEN = `Bearer ${token}`;
  });
  it('creates api key', async () => {
    const { body, status } = await request(app)
      .post(`${GET_API_KEY_URL}`)
      .set('Authorization', AUTHORIZATION_TOKEN);

    expect(status).toEqual(StatusCodes.CREATED);
    expect(body).toHaveProperty('message');
    expect(body.status).toEqual(true);
    expect(body).toHaveProperty('data');
    expect(body.data).toHaveProperty('apiKey');
  });
  it('gets api key', async () => {
    const { body, status } = await request(app)
      .get(`${GET_API_KEY_URL}`)
      .set('Authorization', AUTHORIZATION_TOKEN);
    expect(status).toEqual(StatusCodes.OK);
    expect(body).toHaveProperty('message');
    expect(body.status).toEqual(true);
    expect(body).toHaveProperty('data');
    expect(body.data).toHaveProperty('apiKey');
  });
});
