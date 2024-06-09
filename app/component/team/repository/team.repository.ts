import * as type from '../interface/team.interface';
import TeamModel from './team.model';

class TeamRepository {
  public static async create(data: type.CreateTeamInterface) {
    try {
      return TeamModel.create(data);
    } catch (e) {
      return e;
    }
  }

  public static async getAll(query: type.FindTeamInterface) {
    try {
      return TeamModel.find(query);
    } catch (e) {
      return e;
    }
  }

  public static async get(data: type.FindTeamInterface) {
    try {
      return TeamModel.findOne(data);
    } catch (e) {
      return e;
    }
  }

  public static async update(
    team: type.TeamInterface['_id'],
    params: type.UpdateTeamInterface,
  ) {
    try {
      return TeamModel.findByIdAndUpdate(team, params, { new: true });
    } catch (e) {
      return e;
    }
  }
}

export default TeamRepository;
