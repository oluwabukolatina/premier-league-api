import { Request, Response } from 'express';
import { Types } from 'mongoose';
import TeamService from './team.service';
import ResponseHandler from '../../lib/response-handler';
import SharedHelper from '../../lib/shared.helper';

const { ObjectId } = Types;
class TeamController {
  public create = async (request: Request, response: Response) => {
    const { manager, name, numberOfPlayers, stadium } = request.body;
    const team = await TeamService.create({
      manager,
      numberOfPlayers,
      name: SharedHelper.titleCase(name),
      stadium,
    });
    return ResponseHandler.CreatedResponse(response, 'team created', team);
  };

  public edit = async (request: Request, response: Response) => {
    const team = await TeamService.get(
      { _id: ObjectId(request.params.team) },
      true,
    );
    const updatedTeam = await TeamService.update(team._id, request.body);
    return ResponseHandler.OkResponse(response, 'team edited successfully', {
      team: updatedTeam,
    });
  };

  public remove = async (request: Request, response: Response) => {
    const team = await TeamService.get(
      { _id: ObjectId(request.params.team) },
      true,
    );
    await TeamService.update(team._id, {
      isRemoved: true,
    });
    return ResponseHandler.OkResponse(response, 'team removed successfully');
  };
}

export default TeamController;
