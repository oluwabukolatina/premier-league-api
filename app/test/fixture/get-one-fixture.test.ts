import setupTestDatabase from '../../database/setup-test-database';
import MockData from '../mock/mock-data';
import request from 'supertest';
import app from '../../app';
import { EDIT_TEAM, GET_TEAM } from '../../component/team/team.url';
import { StatusCodes } from 'http-status-codes';
import {
  TEAM_HAS_PREVIOUSLY_BEEN_REMOVED,
  TEAM_INCOREEC_FORM_ID,
} from '../../component/team/team.message';
import { AUTH_TOKEN_REQUIRED } from '../../component/user/auth/auth.message';

setupTestDatabase();
describe('get one fixture', () => {
  let EXISTING_TEAM_ID = '';
  beforeAll(async () => {
    const result = await MockData.getExistingTeam('Man United');
    EXISTING_TEAM_ID = result._id;
  });
  it('does not get a fixture with the incorrect id type', async () => {
    const { body, status } = await request(app).get(`${GET_TEAM}/$34k`);
    expect(status).toEqual(StatusCodes.BAD_REQUEST);
    expect(body.status).toEqual(false);
    expect(body.message).toEqual(TEAM_INCOREEC_FORM_ID);
  });
  it('does not get a fixture that does not exist', async () => {
    const { body, status } = await request(app).get(
      `${GET_TEAM}/66661858964b2e95fcd64f6e`,
    );
    expect(status).toEqual(StatusCodes.NOT_FOUND);
    expect(body.status).toEqual(false);
  });
  it('does not get a fixture that has been removed', async () => {
    const team = await MockData.getRemovedTeam();
    const { body, status } = await request(app).get(`${GET_TEAM}/${team._id}`);
    expect(status).toEqual(StatusCodes.NOT_FOUND);
    expect(body.status).toEqual(false);
    expect(body.message).toEqual(TEAM_HAS_PREVIOUSLY_BEEN_REMOVED);
  });
  it('get a fixture', async () => {
    const { body, status } = await request(app).get(
      `${GET_TEAM}/${EXISTING_TEAM_ID}`,
    );
    expect(status).toEqual(StatusCodes.OK);
    expect(body.status).toEqual(true);
    expect(body).toHaveProperty('data');
    expect(body.data).toHaveProperty('team');
    expect(body.data.team).toHaveProperty('removed', false);
    expect(body.data.team).toHaveProperty('_id');
    expect(body.data.team).toHaveProperty('manager');
    expect(body.data.team).toHaveProperty('stadium');
    expect(body.data.team).toHaveProperty('numberOfPlayers');
  });
});
