import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import setupTestDatabase from '../../database/setup-test-database';
import MockData from '../mock/mock-data';
import app from '../../app';
import {
  GET_COMPLETED_FIXTURES,
  GET_PENDING_FIXTURES,
  SEARCH_FIXTURES,
} from '../../component/fixture/fixture.url';
import { FixtureInterface } from '../../component/fixture/interface/fixture.interface';

setupTestDatabase();
describe('search for fixture', () => {
  let USER_TOKEN = '';
  beforeAll(async () => {
    const { token } = await MockData.getUserToken();
    USER_TOKEN = token;
    const co = await MockData.getCompletedFixture('Arsenal', 'Man United');
    await MockData.getFixture('Liverpool', 'Newcastle United');
  });
  it('search for fixture', async () => {
    const { body, status } = await request(app).get(
      `${SEARCH_FIXTURES}?query=CHE`,
    );
    expect(status).toEqual(StatusCodes.OK);
    expect(body.status).toEqual(true);
    expect(body).toHaveProperty('data');
    expect(body.data).toHaveProperty('fixtures');
    body.data.fixtures.forEach((one: FixtureInterface) => {
      expect(one).toHaveProperty('removed', false);
      expect(one).toHaveProperty('_id');
      expect(one).toHaveProperty('manager');
      expect(one).toHaveProperty('stadium');
      expect(one).toHaveProperty('numberOfPlayers');
    });
  });
  it('search for completed fixtures', async () => {
    const { body, status } = await request(app)
      .get(GET_COMPLETED_FIXTURES)
      .set('Authorization', `Bearer ${USER_TOKEN}`);
    expect(status).toEqual(StatusCodes.OK);
    expect(body.status).toEqual(true);
    expect(body).toHaveProperty('data');
    expect(body.data).toHaveProperty('fixtures');
    body.data.fixtures.forEach((one: FixtureInterface) => {
      expect(one).toHaveProperty('completed', true);
    });
  });
  it('search for pending fixtures', async () => {
    const { body, status } = await request(app)
      .get(`${GET_PENDING_FIXTURES}`)
      .set('Authorization', `Bearer ${USER_TOKEN}`);
    expect(status).toEqual(StatusCodes.OK);
    expect(body.status).toEqual(true);
    expect(body).toHaveProperty('data');
    expect(body.data).toHaveProperty('fixtures');
    body.data.fixtures.forEach((one: FixtureInterface) => {
      expect(one).toHaveProperty('completed', false);
      expect(one).toHaveProperty('homeTeam');
      expect(one).toHaveProperty('awayTeam');
    });
  });
});
