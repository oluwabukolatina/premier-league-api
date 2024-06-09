import * as type from '../interface/fixture.interface';
import FixtureModel from './fixture.model';
import { FindFixtureInterface } from '../interface/fixture.interface';

class FixtureRepository {
  public static async create(data: type.CreateFixtureInterface) {
    try {
      return FixtureModel.create(data);
    } catch (e) {
      return e;
    }
  }

  public static async get(data: type.FindFixtureInterface) {
    try {
      return FixtureModel.findOne(data);
    } catch (e) {
      return e;
    }
  }

  public static async getAll(query: FindFixtureInterface) {
    try {
      return FixtureModel.find(query)
        .populate('homeTeam', '-_id name stadium')
        .populate('awayTeam', '-_id name stadium');
    } catch (e) {
      return e;
    }
  }

  public static async update(
    team: type.FixtureInterface['_id'],
    params: type.UpdateFixtureInterface,
  ) {
    try {
      return FixtureModel.findByIdAndUpdate(team, params, { new: true });
    } catch (e) {
      return e;
    }
  }
}

export default FixtureRepository;
