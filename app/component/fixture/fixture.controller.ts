import { Request, Response } from 'express';
import { Types } from 'mongoose';
import FixtureService from './fixture.service';
import SharedHelper from '../../lib/shared.helper';
import ResponseHandler from '../../lib/response-handler';
import { ClientError } from '../../exception/client.error';
import TeamService from '../team/team.service';

const { ObjectId } = Types;

class FixtureController {
  public create = async (request: Request, response: Response) => {
    const { date } = request.body;
    const awayTeam = request.body.awayTeam.trim();
    const homeTeam = request.body.homeTeam.trim();
    if (awayTeam === homeTeam)
      throw new ClientError('away and home team can not be the same');
    if (ObjectId.isValid(awayTeam)) {
      if (ObjectId.isValid(homeTeam)) {
        await TeamService.get({ _id: awayTeam }, true);
        await TeamService.get({ _id: homeTeam }, true);
        const fixture = await FixtureService.create({
          homeTeam,
          awayTeam,
          date: SharedHelper.formatDateToIso(date),
          uniqueLink: await FixtureService.handleGenerateLinks(
            awayTeam,
            homeTeam,
          ),
        });
        return ResponseHandler.CreatedResponse(
          response,
          'created fixture',
          fixture,
        );
      }
      throw new ClientError('home team is not valid');
    }
    throw new ClientError('away team is not a valid id');
  };

  public remove = async (request: Request, response: Response) => {
    const team = await FixtureService.get(
      { _id: ObjectId(request.params.fixture) },
      true,
    );
    await TeamService.update(team._id, {
      isRemoved: true,
    });
    return ResponseHandler.OkResponse(response, 'team removed successfully');
  };
}

export default FixtureController;
