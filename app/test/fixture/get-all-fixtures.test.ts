import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import setupTestDatabase from '../../database/setup-test-database';
import MockData from '../mock/mock-data';
import app from '../../app';
import { GET_TEAMS } from '../../component/team/team.url';
import {
  AUTH_TOKEN_REQUIRED,
  INCORECT_AUTH_FORMAT,
} from '../../component/user/auth/auth.message';
import { TeamInterface } from '../../component/team/interface/team.interface';

setupTestDatabase();
describe('get all fixtures', () => {
  let USER_TOKEN = '';
  beforeAll(async () => {
    const { token } = await MockData.getUserToken();
    USER_TOKEN = token;
  });
  it('does not let user without authorization token to get fixture', async () => {
    const { body, status } = await request(app).get(`${GET_TEAMS}`);
    expect(status).toEqual(StatusCodes.UNAUTHORIZED);
    expect(body.status).toEqual(false);
    expect(body.message).toEqual(AUTH_TOKEN_REQUIRED);
  });
  it('does not let user get a fixture with the wrong auth format', async () => {
    const { body, status } = await request(app)
      .get(`${GET_TEAMS}`)
      .set('Authorization', `${USER_TOKEN}`);
    expect(status).toEqual(StatusCodes.UNAUTHORIZED);
    expect(body.status).toEqual(false);
    expect(body.message).toEqual(INCORECT_AUTH_FORMAT);
  });
  it('gets all fixture', async () => {
    await MockData.getExistingTeam('Tottenham Hotspur');
    const { body, status } = await request(app)
      .get(`${GET_TEAMS}`)
      .set('Authorization', `Bearer ${USER_TOKEN}`);
    expect(status).toEqual(StatusCodes.OK);

    expect(body.status).toEqual(true);
    expect(body).toHaveProperty('data');
    body.data.teams.forEach((one: TeamInterface) => {
      expect(one).toHaveProperty('removed', false);
      expect(one).toHaveProperty('_id');
      expect(one).toHaveProperty('manager');
      expect(one).toHaveProperty('stadium');
    });
  });
});
