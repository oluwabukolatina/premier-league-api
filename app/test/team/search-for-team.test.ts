import setupTestDatabase from '../../database/setup-test-database';
import MockData from '../mock/mock-data';
import request from 'supertest';
import app from '../../app';
import { SEARCH_FOR_TEAM } from '../../component/team/team.url';
import { StatusCodes } from 'http-status-codes';
import { TeamInterface } from '../../component/team/interface/team.interface';

setupTestDatabase();
describe('search for team', () => {
  beforeAll(async () => {
    await MockData.getExistingTeam();
    await MockData.getAnotherExistingTeam();
  });
  it('search for team', async () => {
    const { body, status } = await request(app).get(
      `${SEARCH_FOR_TEAM}?query=nal`,
    );
    expect(status).toEqual(StatusCodes.OK);
    expect(body.status).toEqual(true);
    expect(body).toHaveProperty('data');
    expect(body.data).toHaveProperty('teams');
    body.data.teams.map((one: TeamInterface) => {
      expect(one).toHaveProperty('isRemoved', false);
      expect(one).toHaveProperty('_id');
      expect(one).toHaveProperty('manager');
      expect(one).toHaveProperty('stadium');
      expect(one).toHaveProperty('numberOfPlayers');
    });
  });
});
