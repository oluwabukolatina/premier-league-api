import request from 'supertest';
import setupTestDatabase from '../../database/setup-test-database';
import app from '../../app';
import * as authUrl from '../../component/user/auth/auth.url';
import TestData from '../../lib/test.data';
import * as teamUrl from '../../component/team/team.url';

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
  async getExistingTeam() {
    const { token } = await this.getAdminToken();
    const { body } = await request(app)
      .post(teamUrl.CREATE_TEAM)
      .send(TestData.createTeamPayload())
      .set('Authorization', `Bearer ${token}`);
    return body.data;
  },
  async getAnotherExistingTeam() {
    const { token } = await this.getAdminToken();
    const { body } = await request(app)
      .post(teamUrl.CREATE_TEAM)
      .send(TestData.createChelseaTeamPayload())
      .set('Authorization', `Bearer ${token}`);
    return body.data;
  },
  async getRemovedTeam() {
    const { token } = await this.getAdminToken();
    const { body: createTeam } = await request(app)
      .post(teamUrl.CREATE_TEAM)
      .send(TestData.createChelseaTeamPayload())
      .set('Authorization', `Bearer ${token}`);
    await request(app)
      .put(`${teamUrl.REMOVE_TEAM}${createTeam.data._id}`)
      .set('Authorization', `Bearer ${token}`);
    return createTeam.data;
  },
};
export default MockData;
