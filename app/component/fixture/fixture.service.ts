import * as type from './interface/fixture.interface';
import FixtureRepository from './repository/fixture.repository';
import { NotFoundError } from '../../exception/not-found.error';
import { TEAM_NOT_FOUND } from '../team/team.message';
import SharedHelper from '../../lib/shared.helper';
import EnvHelper from '../../config/env.helper';
import { GET_FIXTURE } from './fixture.url';

const FixtureService = {
  async create(data: type.CreateFixtureInterface) {
    return FixtureRepository.create(data);
  },
  async get(data: type.FindFixtureInterface) {
    const fixture = await FixtureRepository.get(data);
    if (fixture) return fixture;
    throw new NotFoundError(TEAM_NOT_FOUND);
  },
  async getAll(query?: type.FindFixtureInterface) {
    return FixtureRepository.getAll(query);
  },

  async handleGenerateLinks(awayTeam: string, homeTeam: string) {
    const random = SharedHelper.randomString(8, `${awayTeam}${homeTeam}`);
    const uniqueLink = `${EnvHelper.getAppUrl()}${GET_FIXTURE}?uniqueLink=${random}`;
    const find = await this.find({ uniqueLink });
    if (find) {
      const newRandom = SharedHelper.randomString(8, `${awayTeam}${homeTeam}`);
      return `${EnvHelper.getAppUrl()}${GET_FIXTURE}?uniqueLink=${newRandom}`;
    }
    return uniqueLink;
  },
  async find(params: type.FindFixtureInterface) {
    return FixtureRepository.get(params);
  },
  async update(
    team: type.FixtureInterface['_id'],
    data: type.UpdateFixtureInterface,
  ) {
    return FixtureRepository.update(team, data);
  },
};
export default FixtureService;
