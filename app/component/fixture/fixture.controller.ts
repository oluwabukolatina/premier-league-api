import { Types } from 'mongoose';
import { Request, Response } from 'express';
import { ClientError } from '../../exception/client.error';
import TeamService from '../team/team.service';
import FixtureService from './fixture.service';
import SharedHelper from '../../lib/shared.helper';
import ResponseHandler from '../../lib/response-handler';
import { TeamInterface } from '../team/interface/team.interface';

const { ObjectId } = Types;

class FixtureController {
  public create = async (request: Request, response: Response) => {
    const { date, stadium } = request.body;
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
          stadium,
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
  public edit = async (request: Request, response: Response) => {
    const fixture = await FixtureService.get({
      _id: ObjectId(request.params.fixture),
    });
    const updatedFixture = await FixtureService.update(
      fixture._id,
      request.body,
    );
    return ResponseHandler.OkResponse(response, 'fixture edited successfully', {
      fixture: updatedFixture,
    });
  };

  public getCompleted = async (request: Request, response: Response) => {
    const fixtures = await FixtureService.getAll({ completed: true });
    return ResponseHandler.OkResponse(response, 'fetched fixture', {
      fixtures,
    });
  };

  public getPending = async (request: Request, response: Response) => {
    const fixtures = await FixtureService.getAll({ completed: false });
    return ResponseHandler.OkResponse(response, 'fetched pending fixtures', {
      fixtures,
    });
  };

  public getAll = async (request: Request, response: Response) => {
    const fixtures = await FixtureService.getAll();
    return ResponseHandler.OkResponse(response, 'fetched completed fixture', {
      fixtures,
    });
  };

  public getOne = async (request: Request, response: Response) => {
    const fixture = await FixtureService.get({
      _id: ObjectId(request.params.fixture),
    });

    return ResponseHandler.OkResponse(response, 'fetched fixture', { fixture });
  };

  public remove = async (request: Request, response: Response) => {
    const fixture = await FixtureService.get({
      _id: ObjectId(request.params.fixture),
    });
    await FixtureService.update(fixture._id, {
      removed: true,
    });
    return ResponseHandler.OkResponse(response, 'fixture removed successfully');
  };

  public search = async (request: Request, response: Response) => {
    if (!request.query.query)
      throw new ClientError('query to search with is required');
    const { query } = request.query;
    const regex = new RegExp(query as string, 'i');
    const result = await TeamService.getAll({ name: regex });
    const matchingTeams = result.map((one: TeamInterface) => {
      return { _id: one._id };
    });
    const searchQuery = {
      $or: [
        {
          homeTeam: {
            $in: matchingTeams.map((team: TeamInterface) => team._id),
          },
        },
        {
          awayTeam: {
            $in: matchingTeams.map((team: TeamInterface) => team._id),
          },
        },
        { stadium: regex },
      ],
    };
    const fixtures = await FixtureService.getAll(searchQuery);
    return ResponseHandler.OkResponse(
      response,
      'fetched fixtures successfully',
      { fixtures },
    );
  };
}

export default FixtureController;
