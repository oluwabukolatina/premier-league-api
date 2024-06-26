import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import setupTestDatabase from '../../database/setup-test-database';
import MockData from '../mock/mock-data';
import app from '../../app';
import { EDIT_TEAM } from '../../component/team/team.url';
import TestData from '../../lib/test.data';
import {
  AUTH_TOKEN_REQUIRED,
  USER_NOT_AUTHORIZED,
} from '../../component/user/auth/auth.message';
import { TEAM_NOT_FOUND } from '../../component/team/team.message';

setupTestDatabase();
describe('edit team', () => {
  let ADMIN_TOKEN = '';
  let USER_TOKEN = '';
  let EXISTING_TEAM_ID = '';
  beforeAll(async () => {
    const { token } = await MockData.getAdminToken();
    ADMIN_TOKEN = token;
    const { token: userToken } = await MockData.getUserToken();
    USER_TOKEN = userToken;
    const result = await MockData.getAnotherExistingTeam('Liverpool');
    EXISTING_TEAM_ID = result._id;
  });
  it('does not let user without authorization token to edit team ', async () => {
    const { body, status } = await request(app)
      .put(`${EDIT_TEAM}6664ee0a77ace228ea561e60`)
      .send(TestData.createTeamPayload('Tottenham Hotspur'));
    expect(status).toEqual(StatusCodes.UNAUTHORIZED);
    expect(body.status).toEqual(false);
    expect(body.message).toEqual(AUTH_TOKEN_REQUIRED);
  });
  it('does not let NON ADMIN edit a team', async () => {
    const { body, status } = await request(app)
      .put(`${EDIT_TEAM}${EXISTING_TEAM_ID}`)
      .send(TestData.createTeamPayload('Man City'))
      .set('Authorization', `Bearer ${USER_TOKEN}`);
    expect(status).toEqual(StatusCodes.UNAUTHORIZED);
    expect(body.status).toEqual(false);
    expect(body.message).toEqual(USER_NOT_AUTHORIZED);
  });
  it('does not edit a team that does not exist', async () => {
    const { body, status } = await request(app)
      .put(`${EDIT_TEAM}66666753fe00e1de1490cbe8`)
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);
    expect(status).toEqual(StatusCodes.NOT_FOUND);
    expect(body.status).toEqual(false);
    expect(body.message).toEqual(TEAM_NOT_FOUND);
  });
  it('edits a team', async () => {
    const { body, status } = await request(app)
      .put(`${EDIT_TEAM}${EXISTING_TEAM_ID}`)
      .send({
        manager: 'Jurgen Klopp',
        name: 'Liverpool',
      })
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);
    expect(status).toEqual(StatusCodes.OK);
    expect(body.status).toEqual(true);
    expect(body).toHaveProperty('data');
    expect(body.data.team).toHaveProperty('manager', 'Jurgen Klopp');
    expect(body.data.team).toHaveProperty('name', 'Liverpool');
  });
});
