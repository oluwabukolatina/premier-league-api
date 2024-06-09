import FixtureRepository from './repository/fixture.repository';
import TeamRepository from '../team/repository/team.repository';
import { NotFoundError } from '../../exception/not-found.error';
import { TEAM_HAS_BEEN_REMOVED, TEAM_NOT_FOUND } from '../team/team.message';
import SharedHelper from '../../lib/shared.helper';
import EnvHelper from '../../config/env.helper';
import { GET_FIXTURE } from './fixture.url';
import * as type from './interface/fixture.interface';

const FixtureService = {
  async create(data: type.CreateFixtureInterface) {
    return FixtureRepository.create(data);
  },
  async get(data: type.FindFixtureInterface, checkStatus?: boolean) {
    const team = await FixtureRepository.get(data);
    if (checkStatus) {
      if (team) {
        if (team.isRemoved) throw new NotFoundError(TEAM_HAS_BEEN_REMOVED);
        return team;
      }
      throw new NotFoundError(TEAM_NOT_FOUND);
    }
    return team;
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
};
export default FixtureService;
