import * as type from './interface/team.interface';
import TeamRepository from './repository/team.repository';
import { NotFoundError } from '../../exception/not-found.error';
import { TEAM_HAS_BEEN_REMOVED, TEAM_NOT_FOUND } from './team.message';

const TeamService = {
  async create(data: type.CreateTeamInterface) {
    return TeamRepository.create(data);
  },
  async getAll(query: type.FindTeamInterface) {
    return TeamRepository.getAll(query);
  },

  async get(data: type.FindTeamInterface, checkStatus?: boolean) {
    const team = await TeamRepository.get(data);
    if (checkStatus) {
      if (team) {
        if (team.isRemoved) throw new NotFoundError(TEAM_HAS_BEEN_REMOVED);
        return team;
      }
      throw new NotFoundError(TEAM_NOT_FOUND);
    }
    return team;
  },
  async update(
    team: type.TeamInterface['_id'],
    data: type.UpdateTeamInterface,
  ) {
    return TeamRepository.update(team, data);
  },
};
export default TeamService;
