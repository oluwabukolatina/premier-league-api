import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import setupTestDatabase from '../../database/setup-test-database';
import MockData from '../mock/mock-data';
import app from '../../app';
import { REMOVE_TEAM } from '../../component/team/team.url';
import {
  AUTH_TOKEN_REQUIRED,
  INCORECT_AUTH_FORMAT,
  USER_NOT_AUTHORIZED,
} from '../../component/user/auth/auth.message';
import { TEAM_INCOREEC_FORM_ID } from '../../component/team/team.message';

setupTestDatabase();
describe('remove team', () => {
  let ADMIN_TOKEN = '';
  let USER_TOKEN = '';
  let TEAM_ID = '';
  beforeAll(async () => {
    const { token } = await MockData.getAdminToken();
    ADMIN_TOKEN = token;
    const { token: userToken } = await MockData.getUserToken();
    USER_TOKEN = userToken;
    const result = await MockData.getExistingTeam();
    TEAM_ID = result._id;
  });
  it('does not let user without authorization token to remove team ', async () => {
    const { body, status } = await request(app).put(`${REMOVE_TEAM}${TEAM_ID}`);

    expect(status).toEqual(StatusCodes.UNAUTHORIZED);
    expect(body.status).toEqual(false);
    expect(body.message).toEqual(AUTH_TOKEN_REQUIRED);
  });
  it('does not let user remove a team with the wrong auth format', async () => {
    const { body, status } = await request(app)
      .put(`${REMOVE_TEAM}${TEAM_ID}`)

      .set('Authorization', `${USER_TOKEN}`);
    expect(status).toEqual(StatusCodes.UNAUTHORIZED);
    expect(body.status).toEqual(false);
    expect(body.message).toEqual(INCORECT_AUTH_FORMAT);
  });
  it('does not let NON ADMIN remove a team', async () => {
    const { body, status } = await request(app)
      .put(`${REMOVE_TEAM}${TEAM_ID}`)
      .set('Authorization', `Bearer ${USER_TOKEN}`);
    expect(status).toEqual(StatusCodes.UNAUTHORIZED);
    expect(body.status).toEqual(false);
    expect(body.message).toEqual(USER_NOT_AUTHORIZED);
  });
  it('does not remove a team with the incorrect id type', async () => {
    const { body, status } = await request(app)
      .put(`${REMOVE_TEAM}666`)
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);
    expect(status).toEqual(StatusCodes.BAD_REQUEST);
    expect(body.status).toEqual(false);
    expect(body.message).toEqual(TEAM_INCOREEC_FORM_ID);
  });
  it('does not remove a team that does not exist', async () => {
    const { body, status } = await request(app)
      .put(`${REMOVE_TEAM}666514d66621c71bb9f2e7fd`)
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);
    expect(status).toEqual(StatusCodes.NOT_FOUND);
    expect(body.status).toEqual(false);
  });
  it('removes a team', async () => {
    const { body, status } = await request(app)
      .put(`${REMOVE_TEAM}${TEAM_ID}`)
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);
    expect(status).toEqual(StatusCodes.OK);
    expect(body.status).toEqual(true);
  });
});
