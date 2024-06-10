import setupTestDatabase from '../../database/setup-test-database';
import MockData from '../mock/mock-data';
import request from 'supertest';
import app from '../../app';
import { EDIT_FIXTURE } from '../../component/fixture/fixture.url';
import { StatusCodes } from 'http-status-codes';
import {
  AUTH_TOKEN_REQUIRED,
  USER_NOT_AUTHORIZED,
} from '../../component/user/auth/auth.message';
import { FIXTURE_NOT_FOUND } from '../../component/fixture/fixture.message';

setupTestDatabase();
describe('edit fixture', () => {
  let ADMIN_TOKEN = '';
  let USER_TOKEN = '';
  let FIXTURE_ID: mongoose.Types.ObjectId;

  beforeAll(async () => {
    const { token } = await MockData.getAdminToken();
    ADMIN_TOKEN = token;
    const { token: userToken } = await MockData.getUserToken();
    USER_TOKEN = userToken;
    const result = await MockData.getFixture('Arsenal', 'Man City');
    FIXTURE_ID = result._id;
  });
  it('does not let user without authorization token to edit fixture ', async () => {
    const { body, status } = await request(app)
      .put(`${EDIT_FIXTURE}${FIXTURE_ID}`)
      .send({ completed: true });
    expect(status).toEqual(StatusCodes.UNAUTHORIZED);
    expect(body.status).toEqual(false);
    expect(body.message).toEqual(AUTH_TOKEN_REQUIRED);
  });
  it('does not let NON ADMIN edit a fixture', async () => {
    const { body, status } = await request(app)
      .put(`${EDIT_FIXTURE}${FIXTURE_ID}`)
      .send({
        stadium: 'Old Trafford',
      })
      .set('Authorization', `Bearer ${USER_TOKEN}`);
    expect(status).toEqual(StatusCodes.UNAUTHORIZED);
    expect(body.status).toEqual(false);
    expect(body.message).toEqual(USER_NOT_AUTHORIZED);
  });
  it('does not edit a fixture that does not exist', async () => {
    const { body, status } = await request(app)
      .put(`${EDIT_FIXTURE}66666753fe00e1de1490cbe8`)
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);
    expect(status).toEqual(StatusCodes.NOT_FOUND);
    expect(body.status).toEqual(false);
    expect(body.message).toEqual(FIXTURE_NOT_FOUND);
  });
  it('edits a fixture', async () => {
    const { body, status } = await request(app)
      .put(`${EDIT_FIXTURE}${FIXTURE_ID}`)
      .send({
        score: { awayTeam: 10, homeTeam: 5 },
      })
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);
    expect(status).toEqual(StatusCodes.OK);
    expect(body.status).toEqual(true);
    expect(body).toHaveProperty('data');
    expect(body.data.fixture).toHaveProperty('awayTeam');
    expect(body.data.fixture).toHaveProperty('homeTeam');
  });
});
