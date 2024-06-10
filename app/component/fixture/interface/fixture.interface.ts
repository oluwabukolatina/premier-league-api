import { Types } from 'mongoose';
import { TeamInterface } from '../../team/interface/team.interface';
import { UnknownInterface } from '../../../lib/unknown.interface';

export interface FixtureInterface {
  _id: Types.ObjectId;
  awayTeam: string;
  completed: boolean;
  date: Date;
  homeTeam: string;
  removed: boolean;
  score: { homeTeam: number; awayTeam: number };
  uniqueLink: string;
}
export interface CreateFixtureInterface {
  awayTeam: string;
  date: string;
  homeTeam: string;
  stadium: string;
  uniqueLink: string;
}
type FindInterface = {
  uniqueLink?: string;
  _id?: FindFixtureInterface['_id'];
};

interface MultiFindInterface {
  $or: (
    | { homeTeam: TeamInterface['_id'][] }
    | { awayTeam: TeamInterface['_id'][] }
    | { stadium: RegExp }
  )[];
}

export type FindFixtureInterface =
  | FindInterface
  | MultiFindInterface
  | UnknownInterface;

export interface UpdateFixtureInterface {
  awayTeam?: TeamInterface['_id'] | UnknownInterface;
  completed?: boolean;
  date?: Date;
  homeTeam?: TeamInterface['_id'] | UnknownInterface;
  score?: { homeTeam?: number; awayTeam?: number } | UnknownInterface;
  stadium?: boolean;
  uniqueLink?: string;
  removed?: boolean;
}
