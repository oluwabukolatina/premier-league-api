import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import setupTestDatabase from '../../database/setup-test-database';
import MockData from '../mock/mock-data';
import app from '../../app';
import TestData from '../../lib/test.data';
import * as url from '../../component/team/team.url';
import {
  AUTH_TOKEN_REQUIRED,
  INCORECT_AUTH_FORMAT,
  USER_NOT_AUTHORIZED,
} from '../../component/user/auth/auth.message';
import { TEAM_ALREADY_EXISTS } from '../../component/team/team.message';

setupTestDatabase();
describe('create team', () => {
  let ADMIN_TOKEN = '';
  let USER_TOKEN = '';
  let EXISTING_TEAM_NAME = '';
  beforeAll(async () => {
    const { token } = await MockData.getAdminToken();
    ADMIN_TOKEN = token;
    const { token: userToken } = await MockData.getUserToken();
    USER_TOKEN = userToken;
    const result = await MockData.getExistingTeam();
    EXISTING_TEAM_NAME = result.name;
  });
  it('does not let user without authorization token to create team ', async () => {
    const { body, status } = await request(app)
      .post(`${url.CREATE_TEAM}`)
      .send(TestData.createTeamPayload());
    expect(status).toEqual(StatusCodes.UNAUTHORIZED);
    expect(body.status).toEqual(false);
    expect(body.message).toEqual(AUTH_TOKEN_REQUIRED);
  });
  it('does not let user create a team with the wrong auth format', async () => {
    const { body, status } = await request(app)
      .post(`${url.CREATE_TEAM}`)
      .send(TestData.createTeamPayload())
      .set('Authorization', `${USER_TOKEN}`);
    expect(status).toEqual(StatusCodes.UNAUTHORIZED);
    expect(body.status).toEqual(false);
    expect(body.message).toEqual(INCORECT_AUTH_FORMAT);
  });
  it('does not let NON ADMIN create a team', async () => {
    const { body, status } = await request(app)
      .post(`${url.CREATE_TEAM}`)
      .send(TestData.createTeamPayload())
      .set('Authorization', `Bearer ${USER_TOKEN}`);
    expect(status).toEqual(StatusCodes.UNAUTHORIZED);
    expect(body.status).toEqual(false);
    expect(body.message).toEqual(USER_NOT_AUTHORIZED);
  });
  it('does not create a team that already exists', async () => {
    const { body, status } = await request(app)
      .post(`${url.CREATE_TEAM}`)
      .send(TestData.createTeamPayload(EXISTING_TEAM_NAME))
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);
    expect(status).toEqual(StatusCodes.BAD_REQUEST);
    expect(body.status).toEqual(false);
    expect(body.message).toEqual(TEAM_ALREADY_EXISTS);
  });
  it('creates a team', async () => {
    const { body, status } = await request(app)
      .post(`${url.CREATE_TEAM}`)
      .send(TestData.createManCityTeamPayload())
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
