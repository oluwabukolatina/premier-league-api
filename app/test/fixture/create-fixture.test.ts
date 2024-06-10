import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import * as mongoose from 'mongoose';
import setupTestDatabase from '../../database/setup-test-database';
import MockData from '../mock/mock-data';
import app from '../../app';
import TestData from '../../lib/test.data';
import {
  AUTH_TOKEN_REQUIRED,
  INCORECT_AUTH_FORMAT,
  USER_NOT_AUTHORIZED,
} from '../../component/user/auth/auth.message';
import * as url from '../../component/fixture/fixture.url';

setupTestDatabase();
describe('create fixtures', () => {
  let ADMIN_TOKEN = '';
  let USER_TOKEN = '';
  let AWAY_TEAM: mongoose.Types.ObjectId;
  let HOME_TEAM: mongoose.Types.ObjectId;
  beforeAll(async () => {
    const { token } = await MockData.getAdminToken();
    ADMIN_TOKEN = token;
    const { token: userToken } = await MockData.getUserToken();
    USER_TOKEN = userToken;
    const away = await MockData.getExistingTeam('Liverpool');
    AWAY_TEAM = away._id;
    const home = await MockData.getAnotherExistingTeam('Man City');
    HOME_TEAM = home._id;
  });
  it('does not let user without authorization token to create fixture ', async () => {
    const { body, status } = await request(app)
      .post(`${url.CREATE_FIXTURE}`)
      .send(TestData.createFixturePayload(AWAY_TEAM, HOME_TEAM));
    expect(status).toEqual(StatusCodes.UNAUTHORIZED);
    expect(body.status).toEqual(false);
    expect(body.message).toEqual(AUTH_TOKEN_REQUIRED);
  });
  it('does not let user create a fixture with the wrong auth format', async () => {
    const { body, status } = await request(app)
      .post(`${url.CREATE_FIXTURE}`)
      .send(TestData.createFixturePayload(AWAY_TEAM, HOME_TEAM))

      .set('Authorization', `${USER_TOKEN}`);
    expect(status).toEqual(StatusCodes.UNAUTHORIZED);
    expect(body.status).toEqual(false);
    expect(body.message).toEqual(INCORECT_AUTH_FORMAT);
  });
  it('does not let NON ADMIN create a fixture', async () => {
    const { body, status } = await request(app)
      .post(`${url.CREATE_FIXTURE}`)
      .send(TestData.createFixturePayload(AWAY_TEAM, HOME_TEAM))

      .set('Authorization', `Bearer ${USER_TOKEN}`);
    expect(status).toEqual(StatusCodes.UNAUTHORIZED);
    expect(body.status).toEqual(false);
    expect(body.message).toEqual(USER_NOT_AUTHORIZED);
  });
  it('creates fixture', async () => {
    const { body, status } = await request(app)
      .post(`${url.CREATE_FIXTURE}`)
      .send(TestData.createFixturePayload(AWAY_TEAM, HOME_TEAM))
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);
    expect(status).toEqual(StatusCodes.CREATED);
    expect(body.status).toEqual(true);
    expect(body).toHaveProperty('data');
    expect(body.data).toHaveProperty('completed', false);
    expect(body.data).toHaveProperty('_id');
    expect(body.data).toHaveProperty('score');
    expect(body.data.score).toHaveProperty('awayTeam', 0);
    expect(body.data.score).toHaveProperty('homeTeam', 0);
    expect(body.data).toHaveProperty('date');
    expect(body.data).toHaveProperty('uniqueLink');
    expect(body.data).toHaveProperty('stadium');
  });
});
