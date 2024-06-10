import request from 'supertest';
import setupTestDatabase from '../../database/setup-test-database';
import app from '../../app';
import * as authUrl from '../../component/user/auth/auth.url';
import TestData from '../../lib/test.data';
import * as teamUrl from '../../component/team/team.url';
import {
  CREATE_FIXTURE,
  EDIT_FIXTURE,
} from '../../component/fixture/fixture.url';

setupTestDatabase();
const MockData = {
  async getAdminToken() {
    const { email, password } = await this.getSignedUpAdmin();
    const result = await request(app)
      .post(authUrl.SIGN_IN_ADMIN)
      .send({ email, password });
    return { token: result.body.data.token };
  },
  async getUserToken() {
    const { email, password } = await this.getSignedUpuSER();
    const result = await request(app)
      .post(authUrl.SIGN_IN_USER)
      .send({ email, password });
    return { token: result.body.data.token };
  },
  async getSignedUpAdmin() {
    const data = TestData.registerUserPayload();
    const { password } = data;
    await request(app).post(authUrl.SIGN_UP_ADMIN).send(data);
    return { password, email: data.email };
  },
  async getSignedUpuSER() {
    const data = TestData.registerUserPayload();
    const { password } = data;
    await request(app).post(authUrl.SIGN_UP_USER).send(data);
    return { password, email: data.email };
  },
  async getExistingTeam(name: string) {
    const { token } = await this.getAdminToken();
    const { body } = await request(app)
      .post(teamUrl.CREATE_TEAM)
      .send(TestData.createTeamPayload(name))
      .set('Authorization', `Bearer ${token}`);
    return body.data;
  },
  async getFixture(awayTeam: string, homeTEAM: string) {
    const away = await MockData.getExistingTeam(awayTeam);
    const home = await MockData.getAnotherExistingTeam(homeTEAM);
    const { token } = await this.getAdminToken();
    const { body } = await request(app)
      .post(CREATE_FIXTURE)
      .send(TestData.createFixturePayload(away._id, home._id))
      .set('Authorization', `Bearer ${token}`);
    return body.data;
  },
  async getAnotherExistingTeam(name: string) {
    const { token } = await this.getAdminToken();
    const { body } = await request(app)
      .post(teamUrl.CREATE_TEAM)
      .send(TestData.createTeamPayload(name))
      .set('Authorization', `Bearer ${token}`);
    return body.data;
  },
  async getRemovedTeam() {
    const { token } = await this.getAdminToken();
    const { body: createTeam } = await request(app)
      .post(teamUrl.CREATE_TEAM)
      .send(TestData.createTeamPayload('Tottenham Hotspur'))
      .set('Authorization', `Bearer ${token}`);
    await request(app)
      .put(`${teamUrl.REMOVE_TEAM}${createTeam.data._id}`)
      .set('Authorization', `Bearer ${token}`);
    return createTeam.data;
  },
  async getCompletedFixture(away: string, home: string) {
    const result = await this.getFixture(away, home);
    const { token } = await this.getAdminToken();
    const { body } = await request(app)
      .put(`${EDIT_FIXTURE}${result._id}`)
      .send({ completed: true })
      .set('Authorization', `Bearer ${token}`);
    return body.data.fixture;
  },
};
export default MockData;
