import setupTestDatabase from '../../database/setup-test-database';
import MockData from '../mock/mock-data';
import request from 'supertest';
import app from '../../app';
import { GET_TEAMS } from '../../component/team/team.url';
import { StatusCodes } from 'http-status-codes';
import {
  AUTH_TOKEN_REQUIRED,
  INCORECT_AUTH_FORMAT,
} from '../../component/user/auth/auth.message';
import { TeamInterface } from '../../component/team/interface/team.interface';

setupTestDatabase();
describe('get all teams', () => {
  let USER_TOKEN = '';
  beforeAll(async () => {
    const { token } = await MockData.getUserToken();
    USER_TOKEN = token;
  });
  it('does not let user without authorization token to get teams', async () => {
    const { body, status } = await request(app).get(`${GET_TEAMS}`);
    expect(status).toEqual(StatusCodes.UNAUTHORIZED);
    expect(body.status).toEqual(false);
    expect(body.message).toEqual(AUTH_TOKEN_REQUIRED);
  });
  it('does not let user get a team with the wrong auth format', async () => {
    const { body, status } = await request(app)
      .get(`${GET_TEAMS}`)
      .set('Authorization', `${USER_TOKEN}`);
    expect(status).toEqual(StatusCodes.UNAUTHORIZED);
    expect(body.status).toEqual(false);
    expect(body.message).toEqual(INCORECT_AUTH_FORMAT);
  });
  it('gets all teams', async () => {
    await MockData.getExistingTeam();
    const { body, status } = await request(app)
      .get(`${GET_TEAMS}`)
      .set('Authorization', `Bearer ${USER_TOKEN}`);
    expect(status).toEqual(StatusCodes.OK);

    expect(body.status).toEqual(true);
    expect(body).toHaveProperty('data');
    body.data.teams.map((one: TeamInterface) => {
      expect(one).toHaveProperty('isRemoved', false);
      expect(one).toHaveProperty('_id');
      expect(one).toHaveProperty('manager');
      expect(one).toHaveProperty('stadium');
    });
  });
});
