import { Types } from 'mongoose';
import { Request, Response } from 'express';
import TeamService from './team.service';
import SharedHelper from '../../lib/shared.helper';
import ResponseHandler from '../../lib/response-handler';

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

  public getAll = async (request: Request, response: Response) => {
    const teams = await TeamService.getAll();
    return ResponseHandler.OkResponse(response, 'fetched teams', { teams });
  };

  public getOne = async (request: Request, response: Response) => {
    const team = await TeamService.get(
      { _id: ObjectId(request.params.team) },
      true,
    );
    return ResponseHandler.OkResponse(response, 'fetched team', { team });
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
