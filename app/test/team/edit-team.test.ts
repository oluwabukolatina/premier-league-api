import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import setupTestDatabase from '../../database/setup-test-database';
import MockData from '../mock/mock-data';
import app from '../../app';
import TestData from '../../lib/test.data';
import {
  AUTH_TOKEN_REQUIRED,
  INCORECT_AUTH_FORMAT,
  USER_NOT_AUTHORIZED,
} from '../../component/user/auth/auth.message';
import {
  TEAM_ALREADY_EXISTS,
  TEAM_NOT_FOUND,
} from '../../component/team/team.message';
import { EDIT_TEAM,  } from '../../component/team/team.url';

setupTestDatabase();
describe('edit team', () => {
  let ADMIN_TOKEN = '';
  let USER_TOKEN = '';
  let EXISTING_TEAM_NAME = '';
  let EXISTING_TEAM_ID = '';
  beforeAll(async () => {
    const { token } = await MockData.getAdminToken();
    ADMIN_TOKEN = token;
    const { token: userToken } = await MockData.getUserToken();
    USER_TOKEN = userToken;
    const result = await MockData.getExistingTeam();
    EXISTING_TEAM_NAME = result.name;
    EXISTING_TEAM_ID = result._id;
  });
  it('does not let user without authorization token to edit team ', async () => {
    const { body, status } = await request(app)
      .put(`${EDIT_TEAM}`)
      .send(TestData.createTeamPayload());
    expect(status).toEqual(StatusCodes.UNAUTHORIZED);
    expect(body.status).toEqual(false);
    expect(body.message).toEqual(AUTH_TOKEN_REQUIRED);
  });
  it('does not let user edit a team with the wrong auth format', async () => {
    const { body, status } = await request(app)
      .put(`${EDIT_TEAM}`)
      .send(TestData.createTeamPayload())
      .set('Authorization', `${USER_TOKEN}`);
    expect(status).toEqual(StatusCodes.UNAUTHORIZED);
    expect(body.status).toEqual(false);
    expect(body.message).toEqual(INCORECT_AUTH_FORMAT);
  });
  it('does not let NON ADMIN edit a team', async () => {
    const { body, status } = await request(app)
      .put(`${EDIT_TEAM}`)
      .send(TestData.createTeamPayload())
      .set('Authorization', `Bearer ${USER_TOKEN}`);
    expect(status).toEqual(StatusCodes.UNAUTHORIZED);
    expect(body.status).toEqual(false);
    expect(body.message).toEqual(USER_NOT_AUTHORIZED);
  });
  it('does not edit a team without the id', async () => {
    const { body, status } = await request(app)
      .put(`${EDIT_TEAM}`)
      .send(TestData.createTeamPayload(EXISTING_TEAM_NAME))
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);
    expect(status).toEqual(StatusCodes.BAD_REQUEST);
    expect(body.status).toEqual(false);
    expect(body.message).toEqual(TEAM_ALREADY_EXISTS);
  });
  it('does not edit a team with the incorrect id type', async () => {
    const { body, status } = await request(app)
      .put(`${EDIT_TEAM}`)
      .send(TestData.createTeamPayload(EXISTING_TEAM_NAME))
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);
    expect(status).toEqual(StatusCodes.BAD_REQUEST);
    expect(body.status).toEqual(false);
    expect(body.message).toEqual(TEAM_ALREADY_EXISTS);
  });
  it('does not edit a team that does not exist', async () => {
    const { body, status } = await request(app)
      .put(`${EDIT_TEAM}666r35621ced71bb9fde7fdd`)
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);
    expect(status).toEqual(StatusCodes.BAD_REQUEST);
    expect(body.status).toEqual(false);
    expect(body.message).toEqual(TEAM_NOT_FOUND);
  });
  it('edits a team', async () => {
    const { body, status } = await request(app)
      .put(`${EDIT_TEAM}/${EXISTING_TEAM_ID}`)
      .send({
        manager: 'Jurgen Klopp',
        name: 'Liverpool',
      })
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);
    expect(status).toEqual(StatusCodes.CREATED);
    expect(body.status).toEqual(true);
    expect(body).toHaveProperty('data');
    expect(body.data).toHaveProperty('isRemoved', false);
    expect(body.data).toHaveProperty('_id');
    expect(body.data).toHaveProperty('manager');
    expect(body.data).toHaveProperty('stadium');
  });
});
