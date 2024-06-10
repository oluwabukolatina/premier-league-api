import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import setupTestDatabase from '../../database/setup-test-database';
import MockData from '../mock/mock-data';
import app from '../../app';
import { SEARCH_FOR_TEAM } from '../../component/team/team.url';
import { TeamInterface } from '../../component/team/interface/team.interface';

setupTestDatabase();
describe('search for team', () => {
  beforeAll(async () => {
    await MockData.getExistingTeam('Chelsea');
    await MockData.getAnotherExistingTeam('Man United');
  });
  it('search for team', async () => {
    const { body, status } = await request(app).get(
      `${SEARCH_FOR_TEAM}?query=nal`,
    );
    expect(status).toEqual(StatusCodes.OK);
    expect(body.status).toEqual(true);
    expect(body).toHaveProperty('data');
    expect(body.data).toHaveProperty('teams');
    body.data.teams.forEach((one: TeamInterface) => {
      expect(one).toHaveProperty('removed', false);
      expect(one).toHaveProperty('_id');
      expect(one).toHaveProperty('manager');
      expect(one).toHaveProperty('stadium');
      expect(one).toHaveProperty('numberOfPlayers');
    });
  });
});
